.text

#The program checks the ALU instruction in R_type

Main:
		addi    x17 , x0 , 27 //
		addi    x25 , x0 , -72  // 4
		addi    x15 , x0 , 37  // 8
		addi    x8 , x0 , 14  // 12
		addi    x12 , x0 , 3  // 16
		blt     x17 , x25 , Less_r  // 20
		bge     x17 , x25 , Bigger_r  // 24		 = Branch
Less_r:
		sub     x7 , x15 , x8 // 28
		and     x26 , x15 , x8 // 32
		slt     x26 , x26 , x7 // 36
		srl     x26 , x26 , x12 //40
		addi    x31 , x0 , 3  // 44
		bne     x26 , x31 , Fail // 48
Bigger_r:
		or      x7 , x15 , x8 // 52 => 47
		xor     x26 , x15 , x8  // 56 => 43
		sltu     x26 , x26 , x7  // 60 => 1
		sra     x26 , x26 , x12  // 64 => 0
		addi    x31 , x0 , 0  // 68
		bne     x26 , x31 , Fail  // 72
Pass: 
		addi    x1 , x0 , 084 // 76
		jal     x0 , End  // 80
Fail: 
		addi    x1 , x0 , 070 // 84 
End: 
