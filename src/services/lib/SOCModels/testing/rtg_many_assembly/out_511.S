.text

#The program checks the ALU instruction in R_type

Main:
		addi    x11 , x0 , 185 
		addi    x9 , x0 , 86 
		addi    x4 , x0 , 138 
		addi    x27 , x0 , 41 
		addi    x14 , x0 , 2 
		blt     x11 , x9 , Less_r 
		bge     x11 , x9 , Bigger_r 
Less_r:
		sub     x13 , x4 , x27 
		and     x12 , x4 , x27 
		add     x12 , x12 , x13 
		srl     x12 , x12 , x14 
		addi    x26 , x0 , 26 
		bne     x12 , x26 , Fail 
Bigger_r:
		or      x13 , x4 , x27 
		xor     x12 , x4 , x27 
		add     x12 , x12 , x13 
		sra     x12 , x12 , x14 
		addi    x26 , x0 , 83 
		bne     x12 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
