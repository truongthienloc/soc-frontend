.text

#The program checks the ALU instruction in R_type

Main:
		addi    x29 , x0 , 2 
		addi    x11 , x0 , -97 
		addi    x17 , x0 , 180 
		addi    x3 , x0 , 17 
		addi    x5 , x0 , 4 
		blt     x29 , x11 , Less_r 
		bge     x29 , x11 , Bigger_r 
Less_r:
		sub     x8 , x17 , x3 
		and     x13 , x17 , x3 
		add     x13 , x13 , x8 
		srl     x13 , x13 , x5 
		addi    x25 , x0 , 11 
		bne     x13 , x25 , Fail 
Bigger_r:
		or      x8 , x17 , x3 
		xor     x13 , x17 , x3 
		add     x13 , x13 , x8 
		sra     x13 , x13 , x5 
		addi    x25 , x0 , 21 
		bne     x13 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
