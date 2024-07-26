.text

#The program checks the ALU instruction in R_type

Main:
		addi    x28 , x0 , 29 
		addi    x22 , x0 , -70 
		addi    x20 , x0 , 196 
		addi    x1 , x0 , 192 
		addi    x17 , x0 , 3 
		blt     x28 , x22 , Less_r 
		bge     x28 , x22 , Bigger_r 
Less_r:
		sub     x8 , x20 , x1 
		and     x6 , x20 , x1 
		slt     x6 , x6 , x8 
		srl     x6 , x6 , x17 
		addi    x19 , x0 , 24 
		bne     x6 , x19 , Fail 
Bigger_r:
		or      x8 , x20 , x1 
		xor     x6 , x20 , x1 
		sltu     x6 , x6 , x8 
		sra     x6 , x6 , x17 
		addi    x19 , x0 , 25 
		bne     x6 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
