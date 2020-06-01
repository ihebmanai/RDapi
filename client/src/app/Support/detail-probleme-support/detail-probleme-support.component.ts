import { Component, OnInit, Inject } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as socket from 'socket.io-client';
import { CallService } from 'src/app/services/call.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ChatService } from 'src/app/services/chat.service';
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
  dialogRef: any;
  socket: any;
  stream: MediaStream;
  users: any;
  categorie: any;
  online = [];


  constructor(private problemeservice: ProblemeService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private commentservice: CommentService,
    private callService: CallService,
    public dialog: MatDialog,
    private userService: UserService,
    private categorieService: CategorieService,
    private serviceChat: ChatService

  ) {

    this.socket = socket('http://localhost:3000');
  }

  ngOnInit() {
    /* Socket IO connection */
    this.initIoConnection();

    // get id probleme
    this.id = this.route.snapshot.paramMap.get('id');
    // logged User
    this.user = this.userservice.getUserDetails();
    // Detail probleme
    this.problemeservice.getById(this.id).subscribe((probleme) => {
      this.probleme = probleme;
    });
    // comments by Probleme
    this.commentservice.getAll(this.id).subscribe((data: any) => {
      this.comments = data;

    });
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
    this.serviceChat.getUsers();

    this.serviceChat.onlineUsers().subscribe((data) => {
      this.online = data;
    });
  }

  // inialize Socker.Io connection
  private async  initIoConnection() {
    this.callService.initSocket();
    this.callService.cancelClient().subscribe((data) => {
      if (data == this.probleme.userId) {
        this.dialogRef.close();
      }
      this.dialog.open(DialogCancel);

    });
    this.callService.screenShareAnswzer().subscribe((data) => {
      if (data.callId == this.probleme.id) {
        this.dialogRef.close();

        window.open('http://localhost:3000/index.html', '_blank');
      }
    });
  }


  async  controleRequest() {
    this.callService.call(this.probleme.id, 'offer');
    this.dialogRef = this.dialog.open(DialogOverviewExampleDialog);
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
    console.log(this.comment);
    this.commentservice.add(this.comment, this.id).subscribe((comm) => {
      this.comments.push(comm);
      this.comment.contenu = '';
    });

  }

  public getUserById(id) {
    return this.users.find(u => u.id == id);
  }


  public isOnline(id) {
    return this.online.find(u => u.id == id);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

}
@Component({
  selector: 'dialog-cancel',
  templateUrl: 'diag-cancel.html',
})
export class DialogCancel {

}


