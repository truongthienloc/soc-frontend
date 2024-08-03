.text

#The program checks the ALU instruction in R_type

Main:
		addi    x29 , x0 , 69 
		addi    x6 , x0 , -30 
		addi    x31 , x0 , 20 
		addi    x15 , x0 , 85 
		addi    x5 , x0 , 4 
		blt     x29 , x6 , Less_r 
		bge     x29 , x6 , Bigger_r 
Less_r:
		sub     x13 , x31 , x15 
		and     x22 , x31 , x15 
		add     x22 , x22 , x13 
		srl     x22 , x22 , x5 
		addi    x18 , x0 , -3 
		bne     x22 , x18 , Fail 
Bigger_r:
		or      x13 , x31 , x15 
		xor     x22 , x31 , x15 
		add     x22 , x22 , x13 
		sra     x22 , x22 , x5 
		addi    x18 , x0 , 9 
		bne     x22 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
