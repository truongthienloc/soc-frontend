.text

#The program checks the ALU instruction in R_type

Main:
		addi    x3 , x0 , 70 
		addi    x20 , x0 , -29 
		addi    x30 , x0 , 45 
		addi    x12 , x0 , 167 
		addi    x23 , x0 , 2 
		blt     x3 , x20 , Less_r 
		bge     x3 , x20 , Bigger_r 
Less_r:
		sub     x7 , x30 , x12 
		and     x6 , x30 , x12 
		add     x6 , x6 , x7 
		srl     x6 , x6 , x23 
		addi    x9 , x0 , -22 
		bne     x6 , x9 , Fail 
Bigger_r:
		or      x7 , x30 , x12 
		xor     x6 , x30 , x12 
		add     x6 , x6 , x7 
		sra     x6 , x6 , x23 
		addi    x9 , x0 , 78 
		bne     x6 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
