.text

#The program checks the ALU instruction in R_type

Main:
		addi    x9 , x0 , 24 
		addi    x15 , x0 , -75 
		addi    x12 , x0 , 54 
		addi    x20 , x0 , 101 
		addi    x31 , x0 , 3 
		blt     x9 , x15 , Less_r 
		bge     x9 , x15 , Bigger_r 
Less_r:
		sub     x8 , x12 , x20 
		and     x7 , x12 , x20 
		slt     x7 , x7 , x8 
		srl     x7 , x7 , x31 
		addi    x28 , x0 , -2 
		bne     x7 , x28 , Fail 
Bigger_r:
		or      x8 , x12 , x20 
		xor     x7 , x12 , x20 
		sltu     x7 , x7 , x8 
		sra     x7 , x7 , x31 
		addi    x28 , x0 , 25 
		bne     x7 , x28 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
