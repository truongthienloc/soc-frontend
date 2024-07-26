.text

#The program checks the ALU instruction in R_type

Main:
		addi    x2 , x0 , 81 
		addi    x27 , x0 , -18 
		addi    x12 , x0 , 163 
		addi    x15 , x0 , 106 
		addi    x7 , x0 , 4 
		blt     x2 , x27 , Less_r 
		bge     x2 , x27 , Bigger_r 
Less_r:
		sub     x13 , x12 , x15 
		and     x18 , x12 , x15 
		add     x18 , x18 , x13 
		srl     x18 , x18 , x7 
		addi    x20 , x0 , 5 
		bne     x18 , x20 , Fail 
Bigger_r:
		or      x13 , x12 , x15 
		xor     x18 , x12 , x15 
		add     x18 , x18 , x13 
		sra     x18 , x18 , x7 
		addi    x20 , x0 , 27 
		bne     x18 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
