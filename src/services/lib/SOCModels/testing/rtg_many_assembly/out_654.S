.text

#The program checks the ALU instruction in R_type

Main:
		addi    x15 , x0 , 98 
		addi    x27 , x0 , -1 
		addi    x3 , x0 , 137 
		addi    x13 , x0 , 140 
		addi    x29 , x0 , 2 
		blt     x15 , x27 , Less_r 
		bge     x15 , x27 , Bigger_r 
Less_r:
		sub     x30 , x3 , x13 
		and     x31 , x3 , x13 
		add     x31 , x31 , x30 
		srl     x31 , x31 , x29 
		addi    x24 , x0 , 33 
		bne     x31 , x24 , Fail 
Bigger_r:
		or      x30 , x3 , x13 
		xor     x31 , x3 , x13 
		add     x31 , x31 , x30 
		sra     x31 , x31 , x29 
		addi    x24 , x0 , 36 
		bne     x31 , x24 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
