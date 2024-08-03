.text

#The program checks the ALU instruction in R_type

Main:
		addi    x11 , x0 , 98 
		addi    x7 , x0 , -1 
		addi    x4 , x0 , 158 
		addi    x5 , x0 , 76 
		addi    x9 , x0 , 2 
		blt     x11 , x7 , Less_r 
		bge     x11 , x7 , Bigger_r 
Less_r:
		sub     x20 , x4 , x5 
		and     x15 , x4 , x5 
		add     x15 , x15 , x20 
		srl     x15 , x15 , x9 
		addi    x22 , x0 , 23 
		bne     x15 , x22 , Fail 
Bigger_r:
		or      x20 , x4 , x5 
		xor     x15 , x4 , x5 
		add     x15 , x15 , x20 
		sra     x15 , x15 , x9 
		addi    x22 , x0 , 108 
		bne     x15 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
