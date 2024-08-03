.text

#The program checks the ALU instruction in R_type

Main:
		addi    x3 , x0 , 130 
		addi    x19 , x0 , 31 
		addi    x15 , x0 , 49 
		addi    x4 , x0 , 78 
		addi    x11 , x0 , 3 
		blt     x3 , x19 , Less_r 
		bge     x3 , x19 , Bigger_r 
Less_r:
		sub     x2 , x15 , x4 
		and     x22 , x15 , x4 
		add     x22 , x22 , x2 
		srl     x22 , x22 , x11 
		addi    x20 , x0 , -4 
		bne     x22 , x20 , Fail 
Bigger_r:
		or      x2 , x15 , x4 
		xor     x22 , x15 , x4 
		add     x22 , x22 , x2 
		sra     x22 , x22 , x11 
		addi    x20 , x0 , 31 
		bne     x22 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
