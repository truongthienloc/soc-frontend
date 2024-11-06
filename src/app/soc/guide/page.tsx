'use client'
import { TabContext, TabPanel, Tabs, Tab } from '~/components/Tabs'

type Props = {}

export default function GuidePage({}: Props) {
  return (
    <div className="container">
      <TabContext>
        <Tabs variant="scrollable">
          <Tab label="OVERVIEW" />
          <Tab label="CONTROL BUTTON" />
          <Tab label="INSTRUCTIONS SUPPORTED" />
        </Tabs>

        <TabPanel
          className="max-h-[85dvh] space-y-4 overflow-auto px-4 py-4 text-justify"
          index={0}
        >
          <h2 className="text-center text-2xl font-bold text-[#006EAF]">OVERVIEW</h2>

          <p className="indent-8">
            The SOC SIMULATOR is a tool that simulates the behavior of a System on Chip (SoC)
            designed and developed by a group of authors:{' '}
            <strong>Trương Thiên Lộc & Nguyễn Gia Bảo Ngọc</strong>. The purpose of the SOC is to
            support beginners who are starting to explore SoC Design.
          </p>
        </TabPanel>

        <TabPanel
          className="max-h-[85dvh] space-y-4 overflow-auto px-4 py-4 text-justify"
          index={1}
        >
          <h2 className="text-center text-2xl font-bold text-[#006EAF]">CONTROL BUTTON</h2>

          <div>
            <p className="indent-8">
              We have six control buttons: IMPORT, ASSEMBLE, RUN ALL, STEP, FEEDBACK and GUIDE with
              particular functions.
            </p>
            <ul className="list-disc pl-8">
              <li>
                <strong>IMPORT:</strong> Used to import RISC-V code into the system without a code
                editor.
              </li>
              <li>
                <strong>ASSEMBLE:</strong> Runs the assembler to convert RISC-V instructions into
                machine code and check for syntax errors. The Assembler is accessed through the
                “config” button to ensure the system is ready to run.
              </li>
              <li>
                <strong>RUN ALL:</strong> Executes the SoC with all instructions implemented in the
                same session.
              </li>
              <li>
                <strong>STEP:</strong> Executes the SoC with one instruction implemented per
                session.
              </li>
              <li>
                <strong>FEEDBACK:</strong> Allows you to contact us and rate our website if you
                encounter any issues.
              </li>
              <li>
                <strong>GUIDE:</strong> Opens the GUIDE page.
              </li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel
          className="max-h-[85dvh] space-y-4 overflow-auto px-4 py-4 text-justify"
          index={2}
        >
          <h2 className="text-center text-2xl font-bold text-[#006EAF]">INSTRUCTIONS SUPPORTED</h2>

          <div className="space-y-4">
            <p className="indent-8">
              The SOC supports Assembly instructions based on the RISC-V instruction set
              architecture, including instruction formats such as R-type, I-type, S-type, B-type,
              U-type and J-type. You can refer to the image below for an overview of the instruction
              set architecture in RISC-V32I.
            </p>
            <img src="/images/guide/risc-v-instruction.png" alt="RISC-V instruction" />
            <p>
              The following section will provide a detailed explanation of the supported RISC-V
              instructions.
            </p>
            <p>
              <strong>R-TYPE:</strong> R-type instructions are used for arithmetic and logic
              operations based on two source registers, rs1 and rs2, with the result being written
              to the destination register rd.
            </p>
            <ul className="list-disc space-y-2 pl-8">
              <li>
                ADD: The ADD instruction performs an arithmetic addition between two source
                registers, Rs1 and Rs2, and writes the result into the destination register Rd.
              </li>
              <img src="/images/guide/r-type/add-instruction.png" alt="ADD instruction" />

              <li>
                SUB: The SUB instruction performs an arithmetic subtraction between two source
                registers Rs1 and Rs2, and writes the result into the destination register Rd.
              </li>
              <img src="/images/guide/r-type/sub-instruction.png" alt="SUB instruction" />

              <li>
                SLL: The SLL perform logical left shifts on the value in register Rs1 by the shift
                amount held in the lower 5 bits of register Rs2, and writes the result into the
                destination register Rd.
              </li>
              <img src="/images/guide/r-type/sll-instruction.png" alt="SLL instruction" />

              <li>
                SLT: The SLT performs a signed comparison between the values in the two source
                registers rs1 and rs2, writing a &#39;1&#39; to the destination register if rs1 is
                less than rs2.
              </li>
              <img src="/images/guide/r-type/slt-instruction.png" alt="SLT instruction" />

              <li>
                SLTU: The SLTU performs a unsigned comparison between the values in the two source
                registers rs1 and rs2, writing a &#39;1&#39; to the destination register if rs1 is
                less than rs2.
              </li>
              <img src="/images/guide/r-type/sltu-instruction.png" alt="SLTU instruction" />

              <li>
                XOR: The XOR instruction performs bitwise “xor” between two source registers, Rs1
                and Rs2, and writes the result into the destination register Rd.
              </li>
              <img src="/images/guide/r-type/xor-instruction.png" alt="XOR instruction" />

              <li>
                SRL: The SRL perform logical right shift on the value in register Rs1 by the shift
                amount held in the lower 5 bits of register Rs2, and writes result into the
                destination register Rd.
              </li>
              <img src="/images/guide/r-type/srl-instruction.png" alt="SRL instruction" />

              <li>
                SRA: The SRA performs arithmetic right shift on the value in register Rs1 by the
                shift amount held in the lower 5 bits of register Rs2, and writes result into the
                destination register Rd.
              </li>
              <img src="/images/guide/r-type/sra-instruction.png" alt="SRA instruction" />

              <li>
                OR: The OR instruction performs bitwise “or” between two source registers, Rs1 and
                Rs2, and writes the result into the destination register Rd.
              </li>
              <img src="/images/guide/r-type/or-instruction.png" alt="OR instruction" />

              <li>
                AND: The OR instruction performs bitwise “and” between two source registers, Rs1 and
                Rs2, and writes the result into the destination register Rd.
              </li>
              <img src="/images/guide/r-type/and-instruction.png" alt="AND instruction" />
            </ul>

            <p>
              <strong>I-TYPE:</strong>
            </p>
            <ul className="list-disc space-y-2 pl-8">
              <li>
                ADDI: The ADDI instruction performs an arithmetic addition between two Rs1 and the
                sign-extended 12-bit immediate, writes the result into the destination register Rd.
              </li>
              <img src="/images/guide/i-type/addi-instruction.png" alt="ADDI instruction" />

              <li>
                SLTI: The SLTI performs a signed comparison between the values in registers Rs1 and
                the sign-extended 12-bit immediate, writes a &#39;1&#39; to the destination register
                Rd if Rs1 is less than immediate value.
              </li>
              <img src="/images/guide/i-type/slti-instruction.png" alt="SLTI instruction" />

              <li>
                SLTIU: The SLTIU performs a unsigned comparison between the values in registers Rs1
                and the sign-extended 12-bit immediate, writes a &#39;1&#39; to the destination
                register Rd if Rs1 is less than immediate value.
              </li>
              <img src="/images/guide/i-type/sltiu-instruction.png" alt="SLTIU instruction" />

              <li>
                XORI: The XORI instruction performs bitwise “xor” between the values in registers
                Rs1 and the sign-extended 12-bit immediate, writes the result into the destination
                register Rd.
              </li>
              <img src="/images/guide/i-type/xori-instruction.png" alt="XORI instruction" />

              <li>
                ORI: The ORI instruction performs bitwise “or” between the values in registers Rs1
                and the sign-extended 12-bit immediate, writes the result into the destination
                register Rd.
              </li>
              <img src="/images/guide/i-type/ori-instruction.png" alt="ORI instruction" />

              <li>
                ANDI: The ANDI instruction performs bitwise “and” between the values in registers
                Rs1 and the sign-extended 12-bit immediate, writes the result into the destination
                register Rd.
              </li>
              <img src="/images/guide/i-type/andi-instruction.png" alt="ANDI instruction" />

              <li>
                SLLI: The SLLI perform logical left shifts on the value in register Rs1 by the shift
                amount held in the lower 5 bits of the sign-extended 5-bit immediate, and writes the
                result into the destination register Rd.
              </li>
              <img src="/images/guide/i-type/slli-instruction.png" alt="SLLI instruction" />

              <li>
                SRLI: The SLLI perform logical right shifts on the value in register Rs1 by the
                shift amount held in the lower 5 bits of the sign-extended immediate, and writes the
                result into the destination register Rd.
              </li>
              <img src="/images/guide/i-type/srli-instruction.png" alt="SRLI instruction" />

              <li>
                SRAI: The SRAI performs arithmetic right shift on the value in register Rs1 by the
                shift amount held in the lower 5 bits of the sign-extended immediate, and writes
                result into the destination register Rd.
              </li>
              <img src="/images/guide/i-type/srai-instruction.png" alt="SRAI instruction" />

              <li>
                LW: The LW instruction loads 32-bit data from memory into the destination register
                Rd. The address is calculated by adding the value in Rs2 to an immediate value.
              </li>
              <img src="/images/guide/i-type/lw-instruction.png" alt="LW instruction" />

              <li>
                LH: The LH instruction loads 16-bit data from memory into the destination register
                Rd. The address is calculated by adding the value in Rs2 to an immediate value.
              </li>
              <img src="/images/guide/i-type/lh-instruction.png" alt="LH instruction" />

              <li>
                LB: The LB instruction loads 8-bit data from memory into the destination register
                Rd. The address is calculated by adding the value in Rs2 to an immediate value.
              </li>
              <img src="/images/guide/i-type/lb-instruction.png" alt="LB instruction" />
            </ul>

            <p>
              <strong>S-TYPE:</strong>
            </p>
            <ul className="list-disc space-y-2 pl-8">
              <li>
                SW: The SW instruction stores 32-bit data from Rs2 into the Memory. The address is
                calculated by adding the value in Rs1 to an immediate value.
              </li>
              <img src="/images/guide/s-type/sw-instruction.png" alt="SW instruction" />

              <li>
                SH: The SH instruction stores 16-bit data from Rs2 into the Memory. The address is
                calculated by adding the value in Rs1 to an immediate value.
              </li>
              <img src="/images/guide/s-type/sh-instruction.png" alt="SH instruction" />

              <li>
                SB: The SB instruction stores 8-bit data from Rs2 into the Memory. The address is
                calculated by adding the value in Rs1 to an immediate value.
              </li>
              <img src="/images/guide/s-type/sb-instruction.png" alt="SB instruction" />
            </ul>

            <p>
              <strong>B-TYPE:</strong>
            </p>
            <ul className="list-disc space-y-2 pl-8">
              <li>
                BEQ: The BEQ instruction will change the PC’s value based on the addition of the
                current PC value and an immediate value if the values in Rs1 and Rs2 are equal.
                Using signed comparison.
              </li>
              <img src="/images/guide/b-type/beq-instruction.png" alt="BEQ instruction" />

              <li>
                BNE: The BNE instruction will change the PC’s value based on the addition of the
                current PC value and an immediate value if the values in Rs1 and Rs2 are not equal.
                Using signed comparison.
              </li>
              <img src="/images/guide/b-type/bne-instruction.png" alt="BNE instruction" />

              <li>
                BLT: The BLT instruction will change the PC’s value based on the addition of the
                current PC value and an immediate value if the values in Rs1 is less than the value
                in Rs2. Using signed comparison.
              </li>
              <img src="/images/guide/b-type/blt-instruction.png" alt="BLT instruction" />

              <li>
                BGE: The BGE instruction will change the PC’s value based on the addition of the
                current PC value and an immediate value if the values in Rs1 is greater or euqal
                than the value in Rs2. Using signed comparison.
              </li>
              <img src="/images/guide/b-type/bge-instruction.png" alt="BGE instruction" />

              <li>
                BLTU: The BLTU instruction will change the PC’s value based on the addition of the
                current PC value and an immediate value if the values in Rs1 is less than the value
                in Rs2. Using unsigned comparison.
              </li>
              <img src="/images/guide/b-type/bltu-instruction.png" alt="BLTU instruction" />

              <li>
                BGEU: The BGEU instruction will change the PC’s value based on the addition of the
                current PC value and an immediate value if the values in Rs1 is greater or euqal
                than the value in Rs2. Using usigned comparison.
              </li>
              <img src="/images/guide/b-type/bgeu-instruction.png" alt="BGEU instruction" />
            </ul>

            <p>
              <strong>J-TYPE:</strong>
            </p>
            <ul className="list-disc space-y-2 pl-8">
              <li>
                JAL: The JAL instruction will change the PC’s value based on the addition of the
                current PC value and an immediate value without any condition.
              </li>
              <img src="/images/guide/j-type/jal-instruction.png" alt="JAL instruction" />
            </ul>

            <p>
              <strong>U-TYPE:</strong>
            </p>
            <ul className="list-disc space-y-2 pl-8">
              <li>
                LUI: The LUI places the immediate[31:12] value in the top 20 bits of the destination
                register Rd while filling in the lowest 12 bits with zeros.
              </li>
              <img src="/images/guide/u-type/lui-instruction.png" alt="LUI instruction" />

              <li>
                AUIPC: AUIPC creates a 32-bit offset from the 20-bit immediate[31:12], filling in
                the lowest 12 bits with zeros, adds this offset to the pc, and wirte the result in
                register rd.
              </li>
              <img src="/images/guide/u-type/auipc-instruction.png" alt="AUIPC instruction" />
            </ul>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  )
}
