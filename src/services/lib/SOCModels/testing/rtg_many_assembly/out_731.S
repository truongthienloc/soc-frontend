.text

#The program checks the ALU instruction in R_type

Main:
		addi    x12 , x0 , 172 
		addi    x2 , x0 , 73 
		addi    x30 , x0 , 109 
		addi    x9 , x0 , 73 
		addi    x7 , x0 , 4 
		blt     x12 , x2 , Less_r 
		bge     x12 , x2 , Bigger_r 
Less_r:
		sub     x15 , x30 , x9 
		and     x10 , x30 , x9 
		slti    x10 , x10 , 184 
		srl     x10 , x10 , x7 
		addi    x19 , x0 , 6 
		bne     x10 , x19 , Fail 
Bigger_r:
		or      x15 , x30 , x9 
		xor     x10 , x30 , x9 
		sltiu   x10 , x10 , 140 
		sra     x10 , x10 , x7 
		addi    x19 , x0 , 9 
		bne     x10 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
