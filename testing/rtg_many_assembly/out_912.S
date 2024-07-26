.text

#The program checks the ALU instruction in R_type

Main:
		addi    x15 , x0 , 0 
		addi    x11 , x0 , -99 
		addi    x19 , x0 , 35 
		addi    x27 , x0 , 30 
		addi    x17 , x0 , 4 
		blt     x15 , x11 , Less_r 
		bge     x15 , x11 , Bigger_r 
Less_r:
		sub     x22 , x19 , x27 
		and     x7 , x19 , x27 
		add     x7 , x7 , x22 
		srl     x7 , x7 , x17 
		addi    x20 , x0 , 0 
		bne     x7 , x20 , Fail 
Bigger_r:
		or      x22 , x19 , x27 
		xor     x7 , x19 , x27 
		add     x7 , x7 , x22 
		sra     x7 , x7 , x17 
		addi    x20 , x0 , 7 
		bne     x7 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
