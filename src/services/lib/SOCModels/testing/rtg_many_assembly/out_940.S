.text

#The program checks the ALU instruction in R_type

Main:
		addi    x13 , x0 , 198 
		addi    x7 , x0 , 99 
		addi    x4 , x0 , 64 
		addi    x30 , x0 , 8 
		addi    x24 , x0 , 4 
		blt     x13 , x7 , Less_r 
		bge     x13 , x7 , Bigger_r 
Less_r:
		sub     x21 , x4 , x30 
		and     x3 , x4 , x30 
		add     x3 , x3 , x21 
		srl     x3 , x3 , x24 
		addi    x26 , x0 , 3 
		bne     x3 , x26 , Fail 
Bigger_r:
		or      x21 , x4 , x30 
		xor     x3 , x4 , x30 
		add     x3 , x3 , x21 
		sra     x3 , x3 , x24 
		addi    x26 , x0 , 9 
		bne     x3 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
