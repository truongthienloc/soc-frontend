.text

#The program checks the ALU instruction in R_type

Main:
		addi    x12 , x0 , 133 
		addi    x8 , x0 , 34 
		addi    x6 , x0 , 15 
		addi    x26 , x0 , 45 
		addi    x10 , x0 , 4 
		blt     x12 , x8 , Less_r 
		bge     x12 , x8 , Bigger_r 
Less_r:
		sub     x31 , x6 , x26 
		and     x17 , x6 , x26 
		add     x17 , x17 , x31 
		srl     x17 , x17 , x10 
		addi    x2 , x0 , -2 
		bne     x17 , x2 , Fail 
Bigger_r:
		or      x31 , x6 , x26 
		xor     x17 , x6 , x26 
		add     x17 , x17 , x31 
		sra     x17 , x17 , x10 
		addi    x2 , x0 , 5 
		bne     x17 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
