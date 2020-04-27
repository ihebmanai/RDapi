import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemeService } from 'src/app/services/probleme.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as socket from 'socket.io-client';
import { Observable } from 'rxjs';
import { CallService } from 'src/app/services/call.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-detail-probleme',
  templateUrl: './detail-probleme.component.html',
  styleUrls: ['./detail-probleme.component.css']
})
export class DetailProblemeComponent implements OnInit {
  probleme: any = {};
  user: any = {};
  comments = [];
  comment = { contenu: '' };
  id: any;
  ioConnection: any;
  peerConnections = {};
  config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"]
      }
    ]
  };
  socket: any;
  stream: any;

  peerConnection = new RTCPeerConnection();



  constructor(private route: ActivatedRoute, private problemeService: ProblemeService, private userservice: UserService,
    private commentservice: CommentService, public dialog: MatDialog, private callService: CallService
  ) { this.socket = socket('http://localhost:3000') }

  ngOnInit() {
    /* Socket IO connection */
    this.initIoConnection();
    //Navigator Media Stream
    navigator.getUserMedia = navigator.getUserMedia;

    this.id = this.route.snapshot.paramMap.get('id');
    this.problemeService.getById(this.id).subscribe((data) => {
      this.probleme = data
      this.user = this.userservice.getUserDetails()
    })
    //comments by Probleme 
    this.commentservice.getAll(this.id).subscribe((data: any) => {
      this.comments = data;
    })

  }

  private initIoConnection(): void {
    //STUF Configuration for the  RTC connection

    // initilize socker.io 
    this.callService.initSocket();
    this.callService.answer().subscribe((data) => {
      this.peerConnections[data.id].setRemoteDescription(data.description);

    });

    this.callService.watcher().subscribe((id) => {
      console.log('watcher')
      const peerConnection = new RTCPeerConnection(this.config);
      this.peerConnections[id] = peerConnection;


      this.stream.getTracks().forEach(track => peerConnection.addTrack(track, this.stream));

      this.peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.socket.emit("candidate", id, event.candidate);
        }
      };

      this.peerConnection
        .createOffer()
        .then(sdp => this.peerConnection.setLocalDescription(sdp))
        .then(() => {
          this.socket.emit("offer", id, this.peerConnection.localDescription);
        });

    })
    this.callService.candidate().subscribe((data) => {
      this.peerConnections[data.id].addIceCandidate(new RTCIceCandidate(data.candidate));

    })
    this.socket.on("disconnectPeer", id => {
      this.peerConnections[id].close();
      delete this.peerConnections[id];
    });

    //when we are receving a call
    this.callService.onCall()
      .subscribe(async (call) => {
        //if we are calling to solve this issues 
        if (call.callId == this.probleme.id) {
          //seting RTC ansewer 
          //when we accepte 
          const dialogRef = this.dialog.open(DialogRecivedCall);
          const ring = new Audio();
          ring.src = '../../../assets/sound/telephone-ring-04.wav';
          ring.load();
          ring.play();

          dialogRef.afterClosed().subscribe(async result => {
            ring.pause();
            this.getStream();
            console.log(`Dialog result: ${result}`);
          });
        }
      });
  }
  /**
   * resolu
   */
  public resolu() {
    this.problemeService.problemeResolu(this.probleme.id).subscribe((prob) => {
      this.probleme = prob;
    }
    )
  }
  public addComment() {
    console.log(this.comment)
    this.commentservice.add(this.comment, this.id).subscribe((comm) => {
      this.comments.push(comm);
      this.comment.contenu = '';
    })
  }
  getStream() {
    const constraints = {
      video: true,
      audio: true
    };
    return navigator.mediaDevices.getDisplayMedia(constraints).then((stream) => this.gotStream(stream)).catch((err) => { console.error(err) });
  }

  gotStream(stream) {
    this.stream = stream;
    console.log(this.stream)
    this.socket.emit("broadcaster");
  }


}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogRecivedCall {

}
