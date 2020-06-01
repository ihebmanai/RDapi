import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemeService } from 'src/app/services/probleme.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as socket from 'socket.io-client';
import { Observable } from 'rxjs';
import { CallService } from 'src/app/services/call.service';
import { CategorieService } from 'src/app/services/categorie.service';
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
  socket: any;
  stream: MediaStream;
  users: any
  categorie: any;

  constructor(private route: ActivatedRoute, private problemeService: ProblemeService, private userservice: UserService,
    private commentservice: CommentService, public dialog: MatDialog, private callService: CallService, private userService: UserService
    , private categorieService: CategorieService
  ) { this.socket = socket('http://localhost:3000') }

  ngOnInit() {
    /* Socket IO connection */
    this.initIoConnection();
    //Navigator Media Stream


    this.id = this.route.snapshot.paramMap.get('id');
    this.problemeService.getById(this.id).subscribe((data) => {
      this.probleme = data
      this.user = this.userservice.getUserDetails()
    })
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
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
            if (result) {
              ring.pause();
              window.open('http://localhost:3000/broadcast.html', '_blank');
              this.callService.screenShare(this.probleme.id, 'answer');
            }
            else {
              ring.pause();
              this.callService.cancel(this.probleme.id)
            }
            console.log(`Dialog result: ${result}`);
          });
        }
      });
  }
  /**
   * update a probleme state to 'resolu'
   */
  public resolu() {
    this.problemeService.problemeResolu(this.probleme.id).subscribe((prob) => {
      this.probleme = prob;
    }
    )
  }

  /**
   * add a comment to a poste 
   */
  public addComment() {
    this.commentservice.add(this.comment, this.id).subscribe((comm) => {
      this.comments.push(comm);
      this.comment.contenu = '';
    })
  }
  public getUserById(id) {
    return this.users.find(u => u.id == id)
  }


}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogRecivedCall {

}
