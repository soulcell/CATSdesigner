import { TranslatePipe } from 'educats-translate';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Group} from "../../models/group.model";
import { Help } from '../../models/help.model';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent {

  @Input()
  public allowChanges: boolean;

  @Input()
  public forNN: boolean;

  @Input()
  public adminTests: boolean;

  @Input()
  public adminQuestions: boolean;

  @Input()
  public hideSearch: boolean;

  @Input()
  public groupDropdown: boolean;

  @Input()
  public text: string;

  @Input()
  public inputValue: string;

  @Input()
  public groups: Group[];

  @Output()
  public onValueChangeSearch: EventEmitter<string> = new EventEmitter();

  @Output()
  public onOpenAddingPopupEvent: EventEmitter<void> = new EventEmitter();

  @Output()
  public groupValueChange: EventEmitter<any> = new EventEmitter();

  @Output()
  public addNewQuestion: EventEmitter<any> = new EventEmitter();

  @Output()
  public addQuestionFromOtherTestEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  public createNeuralNetworkEvent: EventEmitter<any> = new EventEmitter();

  help: Help = {
    message: "",
    action: "",
  };

  constructor(private translatePipe: TranslatePipe) {
    this.help = {
      message: this.translatePipe.transform(
        "text.help.tests",
        // tslint:disable-next-line:max-line-length
        "На данной странице можно наблюдать за процессом прохождения тестов для контроля знаний. Верно отвеченные вопросы отображены зеленым цветом, а неверно отвеченные – красным."
      ),
      action: this.translatePipe.transform("button.understand", "Понятно"),
    };
  }

  public onValueChange(event): void {
    this.onValueChangeSearch.emit(event.currentTarget.value);
  }

  public onGroupValueChange(event): void {
    this.groupValueChange.emit(event.source.value);
  }

  public onOpenAddingPopup(): void {
    this.onOpenAddingPopupEvent.emit();
  }

  public onAddNewQuestion(): void {
    this.addNewQuestion.emit();
  }

  public addQuestionFromOtherTest(): void {
    this.addQuestionFromOtherTestEvent.emit();
  }

  public createNeuralNetwork(): void {
    this.createNeuralNetworkEvent.emit();
  }
}
