.text

#The program checks the ALU instruction in R_type

Main:
		addi    x27 , x0 , 1 
		addi    x5 , x0 , -98 
		addi    x12 , x0 , 91 
		addi    x17 , x0 , 185 
		addi    x24 , x0 , 0 
		blt     x27 , x5 , Less_r 
		bge     x27 , x5 , Bigger_r 
Less_r:
		sub     x2 , x12 , x17 
		and     x25 , x12 , x17 
		add     x25 , x25 , x2 
		srl     x25 , x25 , x24 
		addi    x18 , x0 , -69 
		bne     x25 , x18 , Fail 
Bigger_r:
		or      x2 , x12 , x17 
		xor     x25 , x12 , x17 
		add     x25 , x25 , x2 
		sra     x25 , x25 , x24 
		addi    x18 , x0 , 477 
		bne     x25 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
