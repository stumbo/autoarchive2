import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'advancedTab',
  templateUrl: './advancedTab.html',
  styleUrls: ['./advancedTab.css']
})

export class advancedTab implements OnInit {
  editField: string;
  ruleList: Array<any> = [
    {id: 1, active: 'true', action: 'archive', srcFolder: 'inbox', scope: 'global', dstnFolder: 'localFolder/stuff', from: 'here', subject: 'eternity', age: 'young'},
    {id: 2, active: 'true', action: 'archive', srcFolder: 'send folder', scope: 'global', dstnFolder: 'localFolder/sent', from: 'here', subject: 'eternity', age: 'young'},
    {id: 3, active: 'true', action: 'archive', srcFolder: 'spam', scope: 'local', dstnFolder: 'localFolder/spam', from: '', subject: '', age: ''},
  ];

  newRuleList: Array<any> = [

  ];

  ngOnInit() {

  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContext;
    this.ruleList[id][property] = editField;
  }

  remove(id: any) {
    this.newRuleList.push(this.ruleList[id]);
    this.ruleList.splice(id, 1);
  }

  add() {
    if (this.newRuleList.length > 0) {
      const rule = this.newRuleList[0];
      this.ruleList.push(rule);
      this.newRuleList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
