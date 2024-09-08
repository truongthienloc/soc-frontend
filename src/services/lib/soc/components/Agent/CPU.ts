import Konva from 'konva'
import { Agent } from '.'
import { AgentOptions } from './Agent'
import { Scene } from '../Scene'

export default class CPU extends Agent {
    protected code?: string

    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 5,
        options: AgentOptions,
    ) {
        super(layer, x, y, 5, 5, {
            ...options,
            color: '#4f46e5',
            text: 'Processor',
            textColor: 'white',
        })
    }

    public onReady(): void {
        super.onReady()
        this.handleDoubleClick()
    }

    public handleDoubleClick() {
        const toPixel = Scene.toPixel
        this.shape.on('dblclick dbltap', () => {
            console.log('dblclick dbltap')

            // at first lets find position of text node relative to the stage:
            var textPosition = this.shape.getAbsolutePosition()

            // then lets find position of stage container on the page:
            var stageBox = this.scene.getStage().container().getBoundingClientRect()

            // so position of input will be the sum of positions above:
            var areaPosition = {
                x: stageBox.left + textPosition.x - toPixel(this.w / 2),
                y: stageBox.top + textPosition.y,
            }

            // create input and style it
            var input = document.createElement('input')
            input.type = 'file'
            document.body.appendChild(input)

            // input.value = this.code ?? ''
            input.style.position = 'absolute'
            input.style.top = areaPosition.y + 'px'
            input.style.left = areaPosition.x + 'px'
            input.style.backgroundColor = 'white'
            input.style.padding = '0.5rem'

            input.focus()

            input.addEventListener('cancel', () => {
                document.body.removeChild(input)
            })

            input.addEventListener('change', async (e) => {
                const files = input.files
                // console.log('files:', files);

                if (files?.length && files.length > 0) {
                    const file = files.item(0)
                    if (!file || file.type === 'image/*') {
                        return
                    }
                    this.code = await file.text()
                }
                document.body.removeChild(input)
                console.log('this.code: ', this.code)
            })
        })
    }
}
