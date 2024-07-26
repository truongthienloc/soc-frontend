.text

#The program checks the ALU instruction in R_type

Main:
		addi    x17 , x0 , 176 
		addi    x7 , x0 , 77 
		addi    x4 , x0 , 159 
		addi    x21 , x0 , 108 
		addi    x8 , x0 , 1 
		blt     x17 , x7 , Less_r 
		bge     x17 , x7 , Bigger_r 
Less_r:
		sub     x6 , x4 , x21 
		and     x15 , x4 , x21 
		add     x15 , x15 , x6 
		srl     x15 , x15 , x8 
		addi    x13 , x0 , 31 
		bne     x15 , x13 , Fail 
Bigger_r:
		or      x6 , x4 , x21 
		xor     x15 , x4 , x21 
		add     x15 , x15 , x6 
		sra     x15 , x15 , x8 
		addi    x13 , x0 , 249 
		bne     x15 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
