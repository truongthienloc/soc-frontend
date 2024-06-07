import { assembler } from './assembler';
import RiscVProcessor from './RiscV_processor';
import Memory from './Memory';
import InterConnect from './Interconnect';
import { handleRegister, handleImem, handleDmem } from './sub_function';

let pc0 = 0;
let binary_code: string[] = [];
binary_code = assembler('Code_editor.txt');
let instruction_memory0: { [key: string]: string } = {};
for (let i of binary_code) {
    instruction_memory0[pc0.toString(2)] = i;
    pc0 += 4;
}
console.log('binary_code: ', binary_code);

pc0 = 0;

let CPU0 = new RiscVProcessor('CPU[0]', '00');
let Dmem = new Memory();
let I = new InterConnect();
CPU0.instruction_memory = instruction_memory0;
let m = Object.keys(instruction_memory0).length;
let cycle = 0;
for (let i = 0; i < m; i++) {
    cycle += 1;
    pc0 = CPU0.pc;
    let instruction0 = instruction_memory0[pc0.toString(2)].substring(0, 32);
    //('instruction 0: ', instruction_memory0);
    
    let [ messeage, data, address, rd ] = CPU0.run(instruction0, pc0);
    if (messeage === 'PUT') {
        let dm2i = CPU0.master.send(messeage, address, '0', cycle, data);
        I.Port_in_CA(dm2i, 0, cycle);
        I.TransmitChannelA();
        cycle += 1;
        let data_on_channelA = I.Port_out(0);
        let [ di2s, ai2s ] = Dmem.slave.receive(cycle, 'Port_out[1]', data_on_channelA);
        Dmem.DataMemory[ai2s] = di2s;
        cycle += 1;
        let data_on_channelD = Dmem.slave.send(cycle, 'Port_in[1]', 'AccessAck', '');
        I.Port_in_CD(data_on_channelD, 1, cycle);
        I.TransmitChannelD();
        I.Port_out(0);
        cycle += 1;
    }

    if (messeage === 'GET') {
        let dm2i = CPU0.master.send(messeage, address, '0', cycle, data);
        I.Port_in_CA(dm2i, 0, cycle);
        I.TransmitChannelA();
        let data_on_channelA = I.Port_out(0);
        let [ _, ai2s ] = Dmem.slave.receive(cycle, 'Port_out[1]', data_on_channelA);
        let di2s = Dmem.DataMemory[ai2s];
        let data_on_channelD = Dmem.slave.send(cycle, 'Port_in[1]', 'AccessAckData', di2s);
        I.Port_in_CD(data_on_channelD, 1, cycle);
        I.TransmitChannelD();
        CPU0.register[rd] = I.Port_out(0).payload;
    }
}

// CPU0.register = handleRegister(CPU0.register);
//(handleRegister(CPU0.register));

// CPU0.instruction_memory = handleImem(CPU0.instructio

import { writeFileSync } from 'fs';
let fo = 'Data_segment.txt';
let output = "********INSTRUCTION MEMORY*******\n";
for (let i in CPU0.instruction_memory) {
    output += i + "\n";
}
output += "********REGISTERS*******\n";
console.log(CPU0.getRegisters());

for (let i in CPU0.getRegisters()) {
    output += i + "\t"+ CPU0.register[i] + "\n" ;
}
output += "********DATA MEMORY*******\n";
for (let i in CPU0.Data_memory) {
    output += i + "\n";
}
writeFileSync(fo, output);