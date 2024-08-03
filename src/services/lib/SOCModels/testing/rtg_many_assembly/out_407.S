.text

#The program checks the ALU instruction in R_type

Main:
		addi    x13 , x0 , 185 
		addi    x11 , x0 , 86 
		addi    x9 , x0 , 39 
		addi    x31 , x0 , 199 
		addi    x5 , x0 , 4 
		blt     x13 , x11 , Less_r 
		bge     x13 , x11 , Bigger_r 
Less_r:
		sub     x24 , x9 , x31 
		and     x17 , x9 , x31 
		add     x17 , x17 , x24 
		srl     x17 , x17 , x5 
		addi    x28 , x0 , -10 
		bne     x17 , x28 , Fail 
Bigger_r:
		or      x24 , x9 , x31 
		xor     x17 , x9 , x31 
		add     x17 , x17 , x24 
		sra     x17 , x17 , x5 
		addi    x28 , x0 , 28 
		bne     x17 , x28 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
