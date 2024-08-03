.text

#The program checks the ALU instruction in R_type

Main:
		addi    x7 , x0 , 89 
		addi    x12 , x0 , -10 
		addi    x16 , x0 , 106 
		addi    x20 , x0 , 114 
		addi    x9 , x0 , 3 
		blt     x7 , x12 , Less_r 
		bge     x7 , x12 , Bigger_r 
Less_r:
		sub     x30 , x16 , x20 
		and     x13 , x16 , x20 
		slt     x13 , x13 , x30 
		srl     x13 , x13 , x9 
		addi    x5 , x0 , 11 
		bne     x13 , x5 , Fail 
Bigger_r:
		or      x30 , x16 , x20 
		xor     x13 , x16 , x20 
		sltu     x13 , x13 , x30 
		sra     x13 , x13 , x9 
		addi    x5 , x0 , 18 
		bne     x13 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
