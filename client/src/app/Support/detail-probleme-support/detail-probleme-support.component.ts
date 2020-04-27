import { Component, OnInit, Inject } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as socket from 'socket.io-client';
import { CallService } from 'src/app/services/call.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-detail-probleme-support',
  templateUrl: './detail-probleme-support.component.html',
  styleUrls: ['./detail-probleme-support.component.css']
})
export class DetailProblemeSupportComponent implements OnInit {
  private probleme: any;
  private comments = [];
  private id;
  private user: any;
  private affected = false;
  private comment = { contenu: '' };
  ioConnection: any;
  configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
  peerConnection = new RTCPeerConnection();
  dialogRef: any;
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




  constructor(private problemeservice: ProblemeService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private commentservice: CommentService,
    private callService: CallService,
    public dialog: MatDialog,

  ) {

    this.socket = socket('http://localhost:3000')
  }

  ngOnInit() {
    /* Socket IO connection */
    this.initIoConnection();
    this.callService.offer().subscribe((data) => {
      this.peerConnection = new RTCPeerConnection(this.config);
      this.peerConnection
        .setRemoteDescription(data.description)
        .then(() => this.peerConnection.createAnswer())
        .then(sdp => this.peerConnection.setLocalDescription(sdp))
        .then(() => {
          this.socket.emit("answer", data.id, this.peerConnection.localDescription);
        });
      this.peerConnection.ontrack = event => {
        console.log(event.streams[0]);
      };
      this.peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.socket.emit("candidate", data.id, event.candidate);
        }
      };

    })

    this.callService.candidate().subscribe((data) => {
      this.peerConnection
        .addIceCandidate(new RTCIceCandidate(data.candidate))
        .catch(e => console.error(e));

    })
    this.callService.connect().subscribe(() => {
      this.socket.emit("watcher");

    })
    this.callService.broadcaster().subscribe(() => {
      this.socket.emit("watcher");

    })

    //get id probleme 
    this.id = this.route.snapshot.paramMap.get('id');
    //logged User
    this.user = this.userservice.getUserDetails();
    //Detail probleme
    this.problemeservice.getById(this.id).subscribe((probleme) => {
      this.probleme = probleme;
    })
    //comments by Probleme 
    this.commentservice.getAll(this.id).subscribe((data: any) => {
      this.comments = data;

    })

  }

  //inialize Socker.Io connection 
  private async  initIoConnection() {
    this.callService.initSocket();



  }


  async  controleRequest() {

    this.callService.call(this.probleme.id, 'offer');

  }





  /**
  * affectProbToSupport
  */
  affectProbToSupport() {
    this.problemeservice.affecteSupport(this.probleme.id).subscribe((prob: any) => {
      if (prob.affecte == 'affecte') {
        this.affected = true;
        this.probleme = prob.probleme;
      } else {
        this.probleme = prob;
      }
    });
  }
  public fermerProb() {
    this.problemeservice.problemeFermer(this.probleme.id).subscribe((prob: any) => {
      this.probleme = prob;
    }
    );
  }

  /**
   * addComment
   */
  public addComment() {
    console.log(this.comment)
    this.commentservice.add(this.comment, this.id).subscribe((comm) => {
      this.comments.push(comm);
      this.comment.contenu = '';
    })

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

}

