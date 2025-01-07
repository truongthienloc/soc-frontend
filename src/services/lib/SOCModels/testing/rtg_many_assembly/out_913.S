.text

#The program checks the ALU instruction in R_type

Main:
		addi    x18 , x0 , 6 
		addi    x16 , x0 , -93 
		addi    x27 , x0 , 178 
		addi    x2 , x0 , 124 
		addi    x10 , x0 , 1 
		blt     x18 , x16 , Less_r 
		bge     x18 , x16 , Bigger_r 
Less_r:
		sub     x30 , x27 , x2 
		and     x6 , x27 , x2 
		slti    x6 , x6 , 99 
		srl     x6 , x6 , x10 
		addi    x13 , x0 , 51 
		bne     x6 , x13 , Fail 
Bigger_r:
		or      x30 , x27 , x2 
		xor     x6 , x27 , x2 
		sltiu   x6 , x6 , 134 
		sra     x6 , x6 , x10 
		addi    x13 , x0 , 230 
		bne     x6 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
