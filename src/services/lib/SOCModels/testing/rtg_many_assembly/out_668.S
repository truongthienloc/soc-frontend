.text

#The program checks the ALU instruction in R_type

Main:
		addi    x17 , x0 , 105 
		addi    x30 , x0 , 6 
		addi    x7 , x0 , 159 
		addi    x3 , x0 , 60 
		addi    x18 , x0 , 0 
		blt     x17 , x30 , Less_r 
		bge     x17 , x30 , Bigger_r 
Less_r:
		sub     x9 , x7 , x3 
		and     x12 , x7 , x3 
		add     x12 , x12 , x9 
		srl     x12 , x12 , x18 
		addi    x8 , x0 , 127 
		bne     x12 , x8 , Fail 
Bigger_r:
		or      x9 , x7 , x3 
		xor     x12 , x7 , x3 
		add     x12 , x12 , x9 
		sra     x12 , x12 , x18 
		addi    x8 , x0 , 354 
		bne     x12 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
