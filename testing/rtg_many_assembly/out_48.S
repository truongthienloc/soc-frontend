.text

#The program checks the ALU instruction in R_type

Main:
		addi    x24 , x0 , 62 
		addi    x13 , x0 , -37 
		addi    x6 , x0 , 29 
		addi    x10 , x0 , 146 
		addi    x5 , x0 , 2 
		blt     x24 , x13 , Less_r 
		bge     x24 , x13 , Bigger_r 
Less_r:
		sub     x30 , x6 , x10 
		and     x18 , x6 , x10 
		add     x18 , x18 , x30 
		srl     x18 , x18 , x5 
		addi    x2 , x0 , -26 
		bne     x18 , x2 , Fail 
Bigger_r:
		or      x30 , x6 , x10 
		xor     x18 , x6 , x10 
		add     x18 , x18 , x30 
		sra     x18 , x18 , x5 
		addi    x2 , x0 , 75 
		bne     x18 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
