.text

#The program checks the ALU instruction in R_type

Main:
		addi    x20 , x0 , 58 
		addi    x4 , x0 , -41 
		addi    x7 , x0 , 126 
		addi    x6 , x0 , 37 
		addi    x25 , x0 , 4 
		blt     x20 , x4 , Less_r 
		bge     x20 , x4 , Bigger_r 
Less_r:
		sub     x8 , x7 , x6 
		and     x15 , x7 , x6 
		slti    x15 , x15 , 131 
		srl     x15 , x15 , x25 
		addi    x17 , x0 , 7 
		bne     x15 , x17 , Fail 
Bigger_r:
		or      x8 , x7 , x6 
		xor     x15 , x7 , x6 
		sltiu   x15 , x15 , 74 
		sra     x15 , x15 , x25 
		addi    x17 , x0 , 13 
		bne     x15 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
