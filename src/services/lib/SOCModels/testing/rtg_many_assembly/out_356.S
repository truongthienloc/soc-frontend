.text

#The program checks the ALU instruction in R_type

Main:
		addi    x21 , x0 , 35 
		addi    x8 , x0 , -64 
		addi    x31 , x0 , 3 
		addi    x3 , x0 , 28 
		addi    x4 , x0 , 1 
		blt     x21 , x8 , Less_r 
		bge     x21 , x8 , Bigger_r 
Less_r:
		sub     x10 , x31 , x3 
		and     x16 , x31 , x3 
		slti    x16 , x16 , 148 
		srl     x16 , x16 , x4 
		addi    x15 , x0 , -13 
		bne     x16 , x15 , Fail 
Bigger_r:
		or      x10 , x31 , x3 
		xor     x16 , x31 , x3 
		sltiu   x16 , x16 , 79 
		sra     x16 , x16 , x4 
		addi    x15 , x0 , 31 
		bne     x16 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
