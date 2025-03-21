import Slave from '../Interconnect/Slave'
 import ChannelA from "../Interconnect/ChannelA"
 import LedMatrix from '../../control/LedMatrix'
 
 export default class LEDMatrix {
 
     controlRegister : string
     dataRegisters   : string[]
     matrix_buffer   : string[]
     Matrix_Slave    : Slave
     state           : number
 
     constructor() {
         this.controlRegister        = '00000000000000000000000000000000'
         this.dataRegisters          = Array(288).fill('00000000000000000000000000000000')
         this.matrix_buffer          = Array(96).fill('00000000000000000000000000000000')
         this.Matrix_Slave           = new Slave('Matrix_Slave', true)
         this.Matrix_Slave.ChannelD.sink = '1'
         this.state                  = 0
     }
 
     public run (ChannelA: ChannelA, cycle : number) {
 
         if (this.state == 0) {
             if  (ChannelA.valid == '1') {
                 console.log  (
                     'Cycle ',
                     cycle.toString(), 
                     ': The LED matrix is being configured.'
                 )
                 this.controlRegister = ChannelA.data
                 this.state +=1
             }
         }
 
         if (this.state == 1) {
             console.log  (
                 'Cycle ',
                 cycle.toString(), 
                 ': The LED matrix is operating.'
             )
             this.Matrix_Slave.receive (ChannelA)
             this.writeData (this.Matrix_Slave.ChannelA.address, this.Matrix_Slave.ChannelA.data)
             this.display ()
         }
 
     }
 
     writeData(address: string, data: string) {
         // Kiểm tra địa chỉ và dữ liệu có hợp lệ không
         if (address.length !== 17 || data.length !== 32) {
             throw new Error("Invalid address or data length")
         }
 
         let addr = parseInt(address, 2)  // Chuyển địa chỉ từ chuỗi nhị phân sang số nguyên
         if (addr % 4 !== 0) {
             throw new Error("Address must be a multiple of 4")
         }
 
         let index = addr / 4  // Tính toán chỉ số của thành ghi
         if (index >= 288) {
             throw new Error("Address out of range")
         }
         this.dataRegisters[index] = data  // Gán giá trị vào thành ghi
     }
 
     display() {
         for (let i = 0; i < 96; i++) {
             this.matrix_buffer[i] = this.dataRegisters.slice(i * 3, (i + 1) * 3).join();
         }
     }
 }