.text

#The program checks the ALU instruction in R_type

Main:
		addi    x22 , x0 , 119 
		addi    x17 , x0 , 20 
		addi    x23 , x0 , 43 
		addi    x20 , x0 , 41 
		addi    x15 , x0 , 1 
		blt     x22 , x17 , Less_r 
		bge     x22 , x17 , Bigger_r 
Less_r:
		sub     x27 , x23 , x20 
		and     x12 , x23 , x20 
		add     x12 , x12 , x27 
		srl     x12 , x12 , x15 
		addi    x26 , x0 , 21 
		bne     x12 , x26 , Fail 
Bigger_r:
		or      x27 , x23 , x20 
		xor     x12 , x23 , x20 
		add     x12 , x12 , x27 
		sra     x12 , x12 , x15 
		addi    x26 , x0 , 22 
		bne     x12 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
