.text

#The program checks the ALU instruction in R_type

Main:
		addi    x3 , x0 , 90 
		addi    x8 , x0 , -9 
		addi    x11 , x0 , 25 
		addi    x4 , x0 , 37 
		addi    x25 , x0 , 4 
		blt     x3 , x8 , Less_r 
		bge     x3 , x8 , Bigger_r 
Less_r:
		sub     x5 , x11 , x4 
		and     x15 , x11 , x4 
		add     x15 , x15 , x5 
		srl     x15 , x15 , x25 
		addi    x27 , x0 , -1 
		bne     x15 , x27 , Fail 
Bigger_r:
		or      x5 , x11 , x4 
		xor     x15 , x11 , x4 
		add     x15 , x15 , x5 
		sra     x15 , x15 , x25 
		addi    x27 , x0 , 7 
		bne     x15 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
