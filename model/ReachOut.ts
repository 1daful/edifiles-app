import gql from "graphql-tag";
import { Action, Option, View, PageView, FormView, FormField } from "../src/utils/DataTypes";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";
import { RestClient, Callback, EmailType, QueryType } from "@edifiles/services";
import { config } from "../public/config";
import { Member } from "./Member";
import { Group } from "./Group";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation} from "typeorm";
import { getData } from "../src/utils/DataView";

@Entity()
export class ReachOut {

  //@PrimaryGeneratedColumn()
  //id!: number;
  id = 'reachouts'

  @Column()
  title!: string;

  @ManyToOne(type => Member)
  sender!: Relation<Member>;

  @Column()
  message_type!: string;

  @Column()
  content!: string;

  @Column()
  send_option!: string;
    
    constructor() {
    }
    async create() {
        const membersQuery: QueryType = {
            name: "member",
            data: undefined,
            filters: [],
            modifiers: [],
            columns: [
                "id",
                "firstName",
                "lastName",
                "avatar"
            ]
        }

        const groupsQuery: QueryType = {
            name: "group",
            data: undefined,
            filters: [],
            modifiers: [],
            columns: [
                "id",
                "name"
            ]
        }

        const members = await getData(membersQuery || '', (member) => {
            return new Option({
                label: `${member.firstName} ${member.lastName}`,
                id: member.id,
                sections: [
                    {
                        src: member.avatar,
                        alt: `${member.firstName} ${member.lastName}`,
                    }
                ]
            })
        }) as Option[];
        // (await dbClient.get(membersQuery)).data?.data
        const groups: Option[] = await getData(groupsQuery || '', (group) => {
            return new Option({
                label: group.name,
                id: group.id
            })
        }) as Option[];
        
        const options: Option[] = [
            new Option({
                label: 'groups',
                children: groups
            }),
            new Option({
                label: 'members',
                children: members    
            })
        ]
        const form: FormView = new FormView({
            id: "",                                                                                                                                                                         
            /*compute(filledForm: any) {
                //const rest: RestClient = new RestClient(config.backURL)
                const email: EmailType = {
                    name: filledForm.title,
                    subject: "",
                    text: "",
                    templateKey: "",
                    html: filledForm.content,
                    date: new Date(),
                    attachments: [],
                    inline_images: [],
                    headers: [],
                    messenger: filledForm.messenger,
                    body: filledForm.content
                }
                return { email }
            },*/
            actions: [
                new Action({
                    label: 'schedule',
                    event(filledForm: any) {
                        //const rest: RestClient = new RestClient(config.backURL)
                        const email: EmailType = {
                            name: filledForm.title,
                            subject: "",
                            text: "",
                            templateKey: "",
                            html: filledForm.content,
                            date: new Date(),
                            attachments: [],
                            inline_images: [],
                            headers: [],
                            messenger: filledForm.messenger,
                            body: filledForm.content
                        }
                        const schedule = new Callback(config.backEndApi)
                        schedule.fetch(config.backEndApi.requests.schedule(filledForm.sendOption.params(filledForm.sendOption.answer), filledForm.messageType.params(email)))
                        /*switch (filledForm.sendOption) {
                            case 'attendance':
                                const attendanceQuery = gql`{
                                    serviceScore(totalAttendance: ${filledForm.sendOption.})
                                }`
                                let rest: RestClient = new RestClient(config.backURL)
                                rest.post('schedule', {
                                    query: attendanceQuery,
                                    run: {
                                        url: config.api.ListMonk.baseUrl,
                                        params: config.api.ListMonk.config.baseParams
                                    }
                                })
                                break;
                            case "Birthday":
                                const BirthdayQuery = gql`{
                                    user(dateOfBirth: ${new Date()})
                                }`
                                break;
                            default:
                                break;
                        }*/
                    }
                })
            ],
            sections: [
                new FormField({
                    label: 'title',
                    inputType: 'text',
                    name: 'title'
                }),
                new FormField({
                    label: 'sender',
                    options: options,
                    name: 'senderId'
                }),
                new FormField({
                    label: 'message type',
                    options: [
                        new Option({
                            label: 'sms',
                            params: config.api.Infobip.request.sms
                        }),
                        new Option({
                            label: 'email',
                            params: config.api.ListMonk.requests.campaign
                        }),
                        'notification'
                    ],
                    name: 'message_type'
                }),
                new FormField({
                    label: 'content',
                    inputType: 'textarea',
                    name: 'content'
                }),
                new FormField({
                    label: 'filter recipients by',
                    options: [
                        new Option({
                            label: 'Attendance',
                            inputType: 'number',
                            params: (attendance: any)=> {
                                return gql`{
                                    serviceScore(total_attendance: ${attendance})
                                }`
                            }
                        }),
                        new Option({
                            label: 'Birthday',
                            inputType: 'date',
                            params: (date: any)=> {
                                return gql`{
                                    user(date_of_birth: ${date})
                                }`
                            }
                        }),
                        new Option({
                            label: 'Invitees',
                            children: [
                                new Option({
                                    label: 'Before event',
                                    id: 'before'
                                }),
                                new Option({
                                    label: 'After event',
                                    id: 'after'
                                })
                            ]
                        })
                    ],
                    name: 'sendOption'
                })
            ]
        })

        const view: PageView = new PageView({
            main: [form],
            id: "",
            children: []
        })
        return view
    }
    async getListData(senderUserId?: string, senderGroupId?: string, ...recipientIds: string[]) {
        const createReachOut: Action = new Action({
            label: 'Create',
            event: 'Route',
            args: {
                name: 'categories',
                params: {
                    categories: ['create']
                }
            },
        })
        /*if (senderUserId) {
            query = gql`{
                message (sender_user_id: ${senderUserId})
            }`
        }
        else if (senderGroupId) {
            query = gql`{
                message (sender_group_id: ${senderGroupId})
            }`
        }
        if (recipientIds) {
            query = gql`{
                message (recipient_ids: ${recipientIds})
            }`
        }*/
        //const data2 = await dbClient.get('', query)
        let { data, error } = await new RestClient(config.api.ListMonk).get('/campaigns')
        let dataType: DataType = new DataType({
            sections: [], 
            id: '',
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        })
        if (data)
        {dataType = new DataType({
            sections: [], 
            id: '',
            actionOverlay: data.actionPoint, //the actionPoint takes us to take action on the message
            items: {
                header: [
                    {
                        label: data.title
                    }
                ],
                center: [
                    {
                        label: data.content
                    }
                ],
                footer: [
                    {
                        label: data.createdAt
                    },
                    {
                        label: data.sentAt
                    }
                ]
            }
        })}
        const view: PageView = new PageView({
            sections: [
                createReachOut,
                dataType
            ],
            id: "",
            layout: "Grid",
            children: []
        })
        return view
    }
}

//export const ro = new ReachOut()