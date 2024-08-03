.text

#The program checks the ALU instruction in R_type

Main:
		addi    x16 , x0 , 74 
		addi    x24 , x0 , -25 
		addi    x5 , x0 , 141 
		addi    x19 , x0 , 144 
		addi    x20 , x0 , 3 
		blt     x16 , x24 , Less_r 
		bge     x16 , x24 , Bigger_r 
Less_r:
		sub     x30 , x5 , x19 
		and     x3 , x5 , x19 
		add     x3 , x3 , x30 
		srl     x3 , x3 , x20 
		addi    x12 , x0 , 15 
		bne     x3 , x12 , Fail 
Bigger_r:
		or      x30 , x5 , x19 
		xor     x3 , x5 , x19 
		add     x3 , x3 , x30 
		sra     x3 , x3 , x20 
		addi    x12 , x0 , 23 
		bne     x3 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
