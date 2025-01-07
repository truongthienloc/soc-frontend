.text

#The program checks the ALU instruction in R_type

Main:
		addi    x20 , x0 , 105 
		addi    x13 , x0 , 6 
		addi    x3 , x0 , 167 
		addi    x11 , x0 , 112 
		addi    x26 , x0 , 0 
		blt     x20 , x13 , Less_r 
		bge     x20 , x13 , Bigger_r 
Less_r:
		sub     x6 , x3 , x11 
		and     x22 , x3 , x11 
		add     x22 , x22 , x6 
		srl     x22 , x22 , x26 
		addi    x9 , x0 , 87 
		bne     x22 , x9 , Fail 
Bigger_r:
		or      x6 , x3 , x11 
		xor     x22 , x3 , x11 
		add     x22 , x22 , x6 
		sra     x22 , x22 , x26 
		addi    x9 , x0 , 462 
		bne     x22 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
