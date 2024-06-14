import EventEmitter from '../EventEmitter/EventEmitter'
import { IOModule, Module } from '../soc'
import Monitor from './Monitor'
import { CallBack } from './type'

export default class Keyboard {
    protected containerQuery: string

    private keyboardIO: IOModule
    private monitorManagement: Monitor
    private closeBehavior: CallBack[] = []
    private keyQueue: string = ''

    private event = new EventEmitter()
    public static EVENT = {
        LINE_DOWN: 'line-down',
    }

    public getEvent(): EventEmitter {
        return this.event
    }

    constructor(containerQuery: string, keyboardIO: IOModule, monitorManagement: Monitor) {
        this.containerQuery = containerQuery
        this.keyboardIO = keyboardIO
        this.monitorManagement = monitorManagement
        this.openKeyboardBehavior()
        this.initIOEvent()
    }

    private initIOEvent() {
        this.keyboardIO.getEvent().on(Module.EVENT.ACTIVATE, () => {
            this.openKeyboardBehavior()
        })
        this.keyboardIO.getEvent().on(Module.EVENT.INACTIVATE, () => {
            this.closeKeyboardBehavior()
        })
    }

    private openKeyboardBehavior = () => {
        this.closeKeyboardBehavior()
        const keyboard = document.querySelector(this.containerQuery) as HTMLDivElement
        const allButtons = keyboard.querySelectorAll('button')
        allButtons.forEach((button) => (button.disabled = false))
        this.closeBehavior = []

        const buttons = keyboard.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>

        const monitor = document.querySelector(
            this.monitorManagement.getContainerQuery(),
        ) as HTMLDivElement

        const delete_btn = keyboard.querySelector('.delete') as HTMLButtonElement
        const shift_btn = keyboard.querySelector('.shift') as HTMLButtonElement
        const space_btn = keyboard.querySelector('.space') as HTMLButtonElement
        const enter_btn = keyboard.querySelector('.enter') as HTMLButtonElement

        const handleKeyClick = (key: string) => {
            this.monitorManagement.print(key)
            this.keyQueue += key
        }

        buttons.forEach((btn) => {
            const handleBtnClick = () => {
                handleKeyClick(btn.innerText)
            }
            btn.addEventListener('click', handleBtnClick)

            this.closeBehavior.push(() => {
                btn.removeEventListener('click', handleBtnClick)
            })
        })

        const handleDeleteClick = () => {
            this.monitorManagement.print('Backspace')
            this.keyQueue = this.keyQueue.slice(0, this.keyQueue.length - 1)
        }
        delete_btn.addEventListener('click', handleDeleteClick)
        this.closeBehavior.push(() => {
            delete_btn.removeEventListener('click', handleDeleteClick)
        })

        const handleSpaceClick = () => {
            this.monitorManagement.print(' ')
            this.keyQueue += ' '
        }
        space_btn.addEventListener('click', handleSpaceClick)
        this.closeBehavior.push(() => {
            space_btn.removeEventListener('cancel', handleSpaceClick)
        })

        const handleShiftClick = () => {
            buttons.forEach((btn) => {
                btn.classList.toggle('upper')
            })
        }
        shift_btn.addEventListener('click', handleShiftClick)
        this.closeBehavior.push(() => {
            shift_btn.removeEventListener('click', handleShiftClick)
        })

        const handleEnterClick = () => {
            this.monitorManagement.print('Enter')
            if (this.keyQueue.length > 0) {
                this.getEvent().emit(Keyboard.EVENT.LINE_DOWN, this.keyQueue)
            }
            this.keyQueue = ''
        }
        enter_btn.addEventListener('click', handleEnterClick)
        this.closeBehavior.push(() => {
            enter_btn.removeEventListener('click', handleEnterClick)
        })

        // monitor.addEventListener('click', () => {})

        const handleMonitorKeyDown = (e: KeyboardEvent) => {
            // console.log('Key: ', e.key, ', Code: ', e.detail)
            if (e.key.length === 1) {
                if (e.key >= 'a' && e.key <= 'z') {
                    handleKeyClick(e.key)
                } else if (e.key >= 'A' && e.key <= 'Z') {
                    handleKeyClick(e.key)
                } else if (e.key === ' ') {
                    handleSpaceClick()
                }
            } else {
                if (e.key === 'Backspace') {
                    handleDeleteClick()
                } else if (e.key === 'Enter') {
                    handleEnterClick()
                }
            }
        }
        monitor.addEventListener('keydown', handleMonitorKeyDown)
        this.closeBehavior.push(() => {
            monitor.removeEventListener('keydown', handleMonitorKeyDown)
        })
    }

    private closeKeyboardBehavior = () => {
        // console.log('disable button');
        this.keyQueue = ''
        const keyboard = document.querySelector(this.containerQuery) as HTMLDivElement
        const buttons = keyboard.querySelectorAll('button')
        buttons.forEach((button) => (button.disabled = true))
        this.closeBehavior.forEach((callback) => callback())
    }

    public destroy() {
        this.closeKeyboardBehavior()
        this.keyboardIO.getEvent().off(Module.EVENT.ACTIVATE, this.openKeyboardBehavior)
        this.keyboardIO.getEvent().off(Module.EVENT.INACTIVATE, this.closeKeyboardBehavior)
        this.event.clearAll()
    }


}
