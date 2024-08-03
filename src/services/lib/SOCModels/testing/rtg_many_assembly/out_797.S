.text

#The program checks the ALU instruction in R_type

Main:
		addi    x1 , x0 , 153 
		addi    x4 , x0 , 54 
		addi    x21 , x0 , 22 
		addi    x20 , x0 , 32 
		addi    x9 , x0 , 0 
		blt     x1 , x4 , Less_r 
		bge     x1 , x4 , Bigger_r 
Less_r:
		sub     x22 , x21 , x20 
		and     x12 , x21 , x20 
		add     x12 , x12 , x22 
		srl     x12 , x12 , x9 
		addi    x11 , x0 , -10 
		bne     x12 , x11 , Fail 
Bigger_r:
		or      x22 , x21 , x20 
		xor     x12 , x21 , x20 
		add     x12 , x12 , x22 
		sra     x12 , x12 , x9 
		addi    x11 , x0 , 108 
		bne     x12 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
