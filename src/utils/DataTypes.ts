import { CardStyle, ImageStyle } from "./typeStyle";
import { ActionState, ActionString, Colval, DataType, LayoutType, OnResult } from "./types"
import { Component, reactive } from "vue"

/*export function UseComponent<T>(comp: T){
  return comp

}*/

  class Comp{
    constructor(obj: Object) {
      Object.assign(this, obj)
    }
    comp!: any
  }

  // Define a constructor type
type Constructor<T = {}> = new (...args: any[]) => T;

// Generic mixin function that adds properties to a class
function AddProperties<TBase extends Constructor>(Base: TBase, propertiesToAdd: object) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);

      // Dynamically add properties to the instance
      Object.assign(this, propertiesToAdd);
    }
  };
}

  export function getComp<T extends Object>(obj: T): T { 
    let comp = new Comp(obj)
  
    Object.assign(comp, obj)
    return comp as unknown as T
  }
 
export class Slides {
    constructor(...data: DataType[]) {
        this.content = data
    }
    content!: DataType[]
}

export type Slide = {
    name?: string
    //component?: VComponent | Component
    //img: string
    contents: DataView[]
    style?: CarouselStyle
}

export type CarouselStyle = {
    transitionPrev?: 'fade' | 'slide-down' | 'scale',
    transitionNext?: 'fade' | 'slide-down' | 'scale',
    swipeable?: boolean,
    animated?: boolean,
    controlTextColor?: string,
    controlColor?: string,
    controlType?: 'regular' | 'flat' | 'outline' | 'push' | 'unelevated',
    navigation?: boolean,
    padding?: boolean,
    arrows?: boolean,
    height?: string,
    class?: ClassStyle
}

export type HeaderStyle =  {
    reveal?: boolean,
    bordered?: boolean,
    elevated?: boolean,
    class?: ClassStyle
}

export type ListStyle = & {
    bordered?: boolean
    dense?: boolean
    dark?: boolean
    padding?: boolean
}

export type Hero =  {
    title: string,
    subtitle: string,
    buttonText: string,
    class: string
}

export type HorizontalPosition = 'left' | 'center' | 'right'
export type VerticalPosition = 'top' | 'middle' | 'bottom'

export class Menu {
    header: Partial<HeaderStyle> = {
        reveal: true,
        bordered: false,
        elevated: true,
        class: {
            custom: "fixed-nav",
            margin: 'q-ma-auto'
        }
    }

    toolBar = {
        class: "justify-end"
    }

    brand = {
        class: ""
    }

    hero = {
        backgroundColor: ""
    }

    listStyle?: ListStyle

    closeBtn: Action = new Action({
        id: "closeMenuBtn",
        //icon: 'close',
        label: 'close',
        icon: 'close',
        event: (drawerOpen: boolean)=> {drawerOpen = !drawerOpen},
        style: {
          size: "20px",
          color: "red",
          type: "flat",
          shape: "round",
          dense: true,
        },
        class: "lt-md"
    })
    openBtn: Action = new Action({
        id: "menuBtn",
        icon: 'menu',
        label: '',
        event: (drawerOpen: boolean)=> {drawerOpen = !drawerOpen},
        style: {
          size: "20px",
          color: "primary",
          type: "flat",
          shape: "round",
          dense: true,
        },
        class: "lt-md"
    })
}

export type DataPoint = {
    x: string | number | Date,
    y: string | number
}

export type Series = {
    type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'scatter' | 'bubble' | 'heatmap' | 'radialBar' | 'candlestick'
    data: DataPoint[],
    marker?: any
}[]

export type graphOptions = {
    strokes: any,
    markers: number
}

export type ViewGuard = {
    userColval?: Colval,
    colval?: Colval,
    type?: string
} | boolean

type Position =
  | 'fullscreen'
  | 'fixed'
  | 'absolute'
  | 'fixed-center'
  | 'absolute-center'
  | 'fixed-top'
  | 'absolute-top'
  | 'fixed-right'
  | 'absolute-right'
  | 'fixed-bottom'
  | 'absolute-bottom'
  | 'fixed-left'
  | 'absolute-left'
  | 'fixed-top-left'
  | 'absolute-top-left'
  | 'fixed-top-right'
  | 'absolute-top-right'
  | 'fixed-bottom-left'
  | 'absolute-bottom-left'
  | 'fixed-bottom-right'
  | 'absolute-bottom-right'
  | 'relative-position'
  | 'float-left'
  | 'pull-left'
  | 'float-right'
  | 'pull-right'
  | 'on-left'
  | 'on-right'
  | 'vertical-top'
  | 'vertical-middle'
  | 'vertical-bottom';


  type TextAlignment = 
  | 'text-right'
  | 'text-left'
  | 'text-center'
  | 'text-justify';

type TextTransformation = 
  | 'text-uppercase'
  | 'text-lowercase'
  | 'text-capitalize';

type TextFontWeight = 
  | 'text-weight-thin'
  | 'text-weight-light'
  | 'text-weight-regular'
  | 'text-weight-medium'
  | 'text-weight-bold'
  | 'text-weight-bolder';

type TextFontStyle = 'text-italic'
| 'quote'
| 'block'
| 'no-margin'
| 'no-padding';;

type TextTruncation = 'text-truncate';

type TextType = 
  | 'text-h1'
  | 'text-h2'
  | 'text-h3'
  | 'text-h4'
  | 'text-h5'
  | 'text-h6'
  | 'text-subtitle1'
  | 'text-subtitle2'
  | 'text-body1'
  | 'text-body2'
  | 'text-caption'
  | 'text-overline'
  | 'caption'
  | 'light-paragraph'
  | 'thin-paragraph';


type Typography = {
    alignment: TextAlignment,
    transformation: TextTransformation,
    weight: TextFontWeight,
    font: TextFontStyle,
    truncate: TextTruncation,
    type: TextType
}

type Shadow =
  | 'no-shadow'
  | 'inset-shadow'
  | 'shadow-1'
  | 'shadow-2'
  | 'shadow-3'
  | 'shadow-4'
  | 'shadow-5'
  | 'shadow-6'
  | 'shadow-7'
  | 'shadow-8'
  | 'shadow-9'
  | 'shadow-10'
  | 'shadow-11'
  | 'shadow-12'
  | 'shadow-13'
  | 'shadow-14'
  | 'shadow-15'
  | 'shadow-16'
  | 'shadow-17'
  | 'shadow-18'
  | 'shadow-19'
  | 'shadow-20'
  | 'shadow-21'
  | 'shadow-22'
  | 'shadow-23'
  | 'shadow-24'
  | 'shadow-up-1'
  | 'shadow-up-2'
  | 'shadow-up-3'
  | 'shadow-up-4'
  | 'shadow-up-5'
  | 'shadow-up-6'
  | 'shadow-up-7'
  | 'shadow-up-8'
  | 'shadow-up-9'
  | 'shadow-up-10'
  | 'shadow-up-11'
  | 'shadow-up-12'
  | 'shadow-up-13'
  | 'shadow-up-14'
  | 'shadow-up-15'
  | 'shadow-up-16'
  | 'shadow-up-17'
  | 'shadow-up-18'
  | 'shadow-up-19'
  | 'shadow-up-20'
  | 'shadow-up-21'
  | 'shadow-up-22'
  | 'shadow-up-23'
  | 'shadow-up-24'
  | 'shadow-transition';

  type Padding = 
  | 'q-pa-none' | 'q-pa-xs' | 'q-pa-sm' | 'q-pa-md' | 'q-pa-lg' | 'q-pa-xl'
  | 'q-pt-none' | 'q-pt-xs' | 'q-pt-sm' | 'q-pt-md' | 'q-pt-lg' | 'q-pt-xl'
  | 'q-pr-none' | 'q-pr-xs' | 'q-pr-sm' | 'q-pr-md' | 'q-pr-lg' | 'q-pr-xl'
  | 'q-pb-none' | 'q-pb-xs' | 'q-pb-sm' | 'q-pb-md' | 'q-pb-lg' | 'q-pb-xl'
  | 'q-pl-none' | 'q-pl-xs' | 'q-pl-sm' | 'q-pl-md' | 'q-pl-lg' | 'q-pl-xl'
  | 'q-px-none' | 'q-px-xs' | 'q-px-sm' | 'q-px-md' | 'q-px-lg' | 'q-px-xl'
  | 'q-py-none' | 'q-py-xs' | 'q-py-sm' | 'q-py-md' | 'q-py-lg' | 'q-py-xl';

  type Margin = 
  | 'q-ma-none' | 'q-ma-auto' | 'q-ma-xs' | 'q-ma-sm' | 'q-ma-md' | 'q-ma-lg' | 'q-ma-xl'
  | 'q-mt-none' | 'q-mt-auto' | 'q-mt-xs' | 'q-mt-sm' | 'q-mt-md' | 'q-mt-lg' | 'q-mt-xl'
  | 'q-mr-none' | 'q-mr-auto' | 'q-mr-xs' | 'q-mr-sm' | 'q-mr-md' | 'q-mr-lg' | 'q-mr-xl'
  | 'q-mb-none' | 'q-mb-auto' | 'q-mb-xs' | 'q-mb-sm' | 'q-mb-md' | 'q-mb-lg' | 'q-mb-xl'
  | 'q-ml-none' | 'q-ml-auto' | 'q-ml-xs' | 'q-ml-sm' | 'q-ml-md' | 'q-ml-lg' | 'q-ml-xl'
  | 'q-mx-none' | 'q-mx-auto' | 'q-mx-xs' | 'q-mx-sm' | 'q-mx-md' | 'q-mx-lg' | 'q-mx-xl'
  | 'q-my-none' | 'q-my-auto' | 'q-my-xs' | 'q-my-sm' | 'q-my-md' | 'q-my-lg' | 'q-my-xl';

  type Visibility =
  'hidden'
  | 'invisible'
  | 'transparent'
  | 'disabled'
  | 'dimmed'
  | 'light-dimmed'
  | 'highlight-and-fade'
  | 'ellipsis'
  | 'ellipsis-2-lines'
  | 'ellipsis-3-lines'
  | 'z-top'
  | 'z-max'
  | 'z-absolute';

  type Animate =
  | 'animate-spin'
  | 'animate-spin-reverse'
  | 'animate-blink'
  | 'animate-pop'
  | 'animate-scale'
  | 'animate-fade'
  | 'animate-bounce'

  type PlatformOnly =
  'desktop-only'
  | 'mobile-only'
  | 'cordova-only'
  | 'electron-only'
  | 'touch-only'
  | 'no-touch-only'
  | 'mat-only'
  | 'ios-only'
  | 'platform-ios-only'
  | 'platform-android-only'
  | 'within-iframe-only'

  type PlatformHide =
  'desktop-hide'
  | 'mobile-hide'
  | 'cordova-hide'
  | 'electron-hide'
  | 'touch-hide'
  | 'no-touch-hide'
  | 'mat-hide'
  | 'ios-hide'
  | 'platform-ios-hide'
  | 'platform-android-hide'
  | 'within-iframe-hide'

  type Orientation =
  'orientation-portrait' | 'orientation-landscape'

  type WindowWidth =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'lt-sm'
  | 'lt-md'
  | 'lt-lg'
  | 'lt-xl'
  | 'gt-xs'
  | 'gt-sm'
  | 'gt-md'
  | 'gt-lg';

  type AspectRatio = "aspect-auto"
  | "aspect-square"
  | "aspect-video"

  function getLabel(label: Label | undefined): LabelType | undefined {
    if (label === undefined) {
      return undefined;
    } else if (typeof label === 'object') {
      // Normalize string to LabelObject
      return label;
    } else {
      // Value is already a LabelObject
      return { text: label };
    }
  }

  type ClassStyle = Partial<{
    margin: Margin,
    padding: Padding,
    shadow: Shadow,
    position: Position,
    orientation: Orientation,
    width: WindowWidth,
    visibility: Visibility,
    animate: Animate,
    custom: string,
    aspectRatio: AspectRatio
  }>

  export interface IComponent {
    id?: string
    props?: Record<string, any>
  }

  export class Assignable<T> {
  constructor(obj?: Partial<T>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}

  export class VComponent<T> implements IComponent {
    constructor(component: Partial<T>) {
      Object.assign(this, component)
    }
    id?: string
    props?: Record<string, any>
    //events?: Record<string, any>
    sections?: ViewSection[]
    get? = <T extends Object>(obj: T): T => {
      let comp = new Comp(obj)
      Object.assign(comp, obj)
      this.sections?.push(comp as ViewSection)
      return comp as unknown as T
    }
    //component?: Component
    viewGuard?: ViewGuard
    style?:  Record<string, any>
    class?: any
    watcher?: Function
  }

  export class View extends VComponent<View> {
    constructor(view: View) {
      super(view)
      Object.assign(this, view)
    }
    heading?: Content<any>
    thumbnail?: string | ImageStyle
    description?: Content<any>
    //layout!: LayoutType
    //rows?: number
    //columns?: number
    columnNumber?: number
    horizontalScroll?: boolean
    viewport?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    declare sections: ViewSection[]
    overlay?: string
    actions?: Action[] = []
    card?: boolean | CardStyle
    viewStyle?: {
        
    } 
  }

  export type Section = {}

export class PageView extends VComponent<PageView> {
  declare id: string
  header?: ViewSection[] = []
  footer?: ViewSection[] = []
  main!: View | View[]
  children?: PageView[] = []
  drawerSide?: 'left' | 'right'
}

export class RowView extends View{

}

export class Content<T> extends VComponent<T> {
  private _label?: Label;




  /*constructor(content: Omit<T, 'label'> & {
      label: Label
    }) {
      const { label, ...rest } = content;
      super(rest as Partial<Content<T>>);
      Object.assign(this, rest);
      this.label = getLabel(label)
  }*/

  constructor(obj: Omit<T, 'label'> & { label?: Label }) {
    
      const { label, ...rest } = obj;
      super(rest as Partial<T>);
      Object.assign(this, rest);
    if ('label' in obj) {
      this.label = obj.label;
    }
  }

  set label(value: Label | undefined) {
    this._label = value;
  }

  // Always returns normalized object
  get label(): LabelType | undefined {
    if (typeof this._label === 'object' && this._label !== null) {
      return this._label;
    }
    if (typeof this._label === 'string') {
      return { text: this._label };
    }
    return undefined;
  }
  icon?: string;
}

/*export class Content extends VComponent<Content> {
  /*constructor(content: VComponent & {
    label?: Label | string,
    icon?: string,
  }) {
    super(content)

    const { label, ...rest } = content;
    Object.assign(this, rest);
    this.label = getLabel(label)

    //Object.assign(this, content)

  }


  constructor(content: Omit<T, 'label'> & {
      label: Label
    }) {
      const { label, ...rest } = content;
      super(rest as Partial<Content<T>>);
      Object.assign(this, rest);
      this.label = getLabel(label)
    }
  

  get label(): Label | undefined {
    return this._label;
  }

  // The setter handles the normalization
  set label(value: Label | undefined) {
    if (value === undefined) {
      this._label = undefined;
    } else if (typeof value === 'object') {
      // Normalize string to LabelObject
      this._label = value;
    } else {
      // Value is already a LabelObject
      this._label = { text: value };
    }
  }

  get label(): LabelType | undefined {
    if (this._label === undefined) return undefined;
    if (typeof this._label === 'object') {
      return this._label;
    }
    return { text: this._label || '' };
  }

  set label(value: Label | undefined) {
    this._label = value;
  }

  label?: LabelType

  icon?: string
}*/

  export class InputContent<T> extends Content<T> {
    model?: any
  }

  /*export type Visual = VComponent & {
    label?: string
    icon?: string
  }*/

  export class Loader extends VComponent<Loader> {
    loading!: boolean
    icon!: string
  }

export class Option extends InputContent<Option> {
  /*constructor(option: Option) {
    super(option)
    Object.assign(this, option)
  }*/
  inputType?: InputType
  children?: (Option | Label)[] = []
  params?: any
}

export type InputType = 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date' | 'schedule' | "datetime-local"

export class FormField extends InputContent<FormField> {
  name!: string
  //question: string;
  useInput?: boolean
  inputType?: InputType
  //component?: VComponent;
  options?: (Option | Label)[];
  //actions?: Action[] | ActionList[];
  //image?: string;
  //icon?: string
  rules?: any
}

/*export class FormFields {
  fields!: FormField[]
  layout: LayoutType
  //actions?: Action[] | ActionList[]
}*/

export class FormView extends View {
}

  export class FormList extends View {
    constructor(formList: FormList) {
      super(formList)
      Object.assign(this, formList)
    }

    forms: FormView[] = []
    declare actions?: Action[]
    submit!: Action
  }

  export class DataGraph extends VComponent<DataGraph> {
    heading?: string | undefined;
    layout?: LayoutType | undefined;
    icon?: string | undefined;
    postion?: { y: number; x: number; } | undefined;
    size?: string | undefined;
    viewport?: string | undefined;
    chartType?: string
    series?: []
    label?: []
    data?: DataPoint[]
    xaxisType!: 'category' | 'number'
}

export class DataTable extends VComponent<DataTable> {
  //[x: string]: any;
  columns!: {
      name: string,
      align: "left" | "right" | "center",
      label: string,
      field: string,
      required?: boolean,
      sortable: boolean
  }[]
  rows!: Record<string, any>[]
  setHeader?: boolean;
  tableStyle?: CardStyle | CarouselStyle
  actions?: Action[]
  separator?: string
  computeAction?: Function
}

  export class DataView extends View {
    //title: Label
    //dataContents: Record<string, DataContent>
    dataContents?: {
      contents: (Label | Action)[] | (LabelList | ActionList)[]
    }
  }

  /*export type DataList = View & {
    layout: LayoutType
    
    actions: Action[] | ActionList[]
  }*/

export type LabelType = VComponent<LabelType> & {
  text: string
}

export type Label = string | LabelType

export type LabelList = {
  layout: LayoutType
  labels: Label[]
}

export type Icon = VComponent<Icon> & {
  icon: string,
  size?: string,
  color?: string,
  img?: string
}

export type Image = VComponent<Image> & {
  src: string,
  alt: string,
  caption?: ViewSection,
  overlay?: ViewSection,
  loading?: ViewSection,
  error?: ViewSection
}
//export type DataContent = Label | Action

  export class Action extends Content<Action> {
    /*constructor(action: Omit<Action, 'label'> & {
      label: Label
    }) {
      super(action)
      //Object.assign(this, action)

      const { label, ...rest } = action;
      Object.assign(this, rest);
      this.label = getLabel(label)
    }*/
    type?: string
    iconRight?: string
    args?: any
    event!: Function | ActionString
    onResult?: OnResult
    onError?: OnResult
    state?: ActionState
    children?: Action[]
    actionStyle?: ActionStyle
}

export class ActionList extends VComponent<ActionList> {
  constructor(actionList: ActionList) {
    super(actionList)
    Object.assign(this, actionList)
  }
  name?: string
  declare actions: Action[]
  actionStyle?: ActionStyle
  state?: ActionState
  layout!: LayoutType
}

export type ActionStyle = {
  type?: 'flat' | 'glossy' | 'push' | 'outline' | 'unelevated'
  shape?: 'round' | 'rounded' | 'square'
  dense?: boolean,
  size?: string, 
  ripple?: boolean
  fab?: 'fab' | 'fab-mini'
  stack?: boolean
  stretch?: boolean
  align?: 'center' | 'right' | 'left' | 'around' | 'between' | 'evenly'
  noWrap?: boolean
  noCaps?: boolean,
  color?: string,
  ariaLabel?: string
}

export class NavLink extends Content<NavLink> {
  path!: string
  name!: string
  params?: any
  query?: any
  children?: NavLink[] = []
}

export class NavList extends VComponent<NavList> {
  constructor(obj: NavList) {
    super(obj)
    Object.assign(this, obj)
  }
  links!: NavLink[]
  navType!: TabType
  //layout!: LayoutType
}



export class Filters extends VComponent<Filters> {
  constructor(filters: Filters) {
    super(filters)
    Object.assign(this, filters)
  }
  postion?: { y: number; x: number; } | undefined;
  indexName!: string
  options?: Option[]
  rangeList?: string[]
  checks?: {
      id: string | number | symbol | undefined;
      attribute: string,
      values: {
          label: string,
          iChecked?: string,
          iUndetermined?: string,
          iUnchecked?: string,
      }[] | string[],
      model: any[]
  }[]
}

export type TabType = 'xTab' | 'yTab'

export type ComponentType = VComponent<ComponentType> & {
  component: Component
}
export type ViewSection = View | DataType | FormField | VComponent<any> | NavList | NavLink | Action | ActionList | Image | Content<any> | Label
 | Slides | DataGraph | DataTable | Filters | ComponentType

const view: View = new View({
  props: undefined,
  sections: [],
  id: ""
});

export type RoutePage = {
  id: string,
  parentId: string,
  model: (...args: any[]) => PageView
}

let ght: Image = {
  src: '',
  alt: '',
  overlay: view ,
  id:''
}
let beru = getComp<View>({
  id: "beru",
  style: {},
  sections: []
})
