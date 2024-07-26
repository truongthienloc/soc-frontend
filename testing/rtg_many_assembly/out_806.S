.text

#The program checks the ALU instruction in R_type

Main:
		addi    x13 , x0 , 9 
		addi    x10 , x0 , -90 
		addi    x2 , x0 , 149 
		addi    x5 , x0 , 85 
		addi    x30 , x0 , 2 
		blt     x13 , x10 , Less_r 
		bge     x13 , x10 , Bigger_r 
Less_r:
		sub     x16 , x2 , x5 
		and     x6 , x2 , x5 
		add     x6 , x6 , x16 
		srl     x6 , x6 , x30 
		addi    x15 , x0 , 21 
		bne     x6 , x15 , Fail 
Bigger_r:
		or      x16 , x2 , x5 
		xor     x6 , x2 , x5 
		add     x6 , x6 , x16 
		sra     x6 , x6 , x30 
		addi    x15 , x0 , 101 
		bne     x6 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
