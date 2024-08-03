.text

#The program checks the ALU instruction in R_type

Main:
		addi    x9 , x0 , 42 
		addi    x27 , x0 , -57 
		addi    x21 , x0 , 63 
		addi    x14 , x0 , 114 
		addi    x10 , x0 , 1 
		blt     x9 , x27 , Less_r 
		bge     x9 , x27 , Bigger_r 
Less_r:
		sub     x15 , x21 , x14 
		and     x26 , x21 , x14 
		add     x26 , x26 , x15 
		srl     x26 , x26 , x10 
		addi    x6 , x0 , -1 
		bne     x26 , x6 , Fail 
Bigger_r:
		or      x15 , x21 , x14 
		xor     x26 , x21 , x14 
		add     x26 , x26 , x15 
		sra     x26 , x26 , x10 
		addi    x6 , x0 , 102 
		bne     x26 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
