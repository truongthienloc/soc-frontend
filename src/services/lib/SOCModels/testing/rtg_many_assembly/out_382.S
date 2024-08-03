.text

#The program checks the ALU instruction in R_type

Main:
		addi    x13 , x0 , 156 
		addi    x19 , x0 , 57 
		addi    x21 , x0 , 47 
		addi    x26 , x0 , 151 
		addi    x11 , x0 , 3 
		blt     x13 , x19 , Less_r 
		bge     x13 , x19 , Bigger_r 
Less_r:
		sub     x9 , x21 , x26 
		and     x7 , x21 , x26 
		add     x7 , x7 , x9 
		srl     x7 , x7 , x11 
		addi    x1 , x0 , -13 
		bne     x7 , x1 , Fail 
Bigger_r:
		or      x9 , x21 , x26 
		xor     x7 , x21 , x26 
		add     x7 , x7 , x9 
		sra     x7 , x7 , x11 
		addi    x1 , x0 , 46 
		bne     x7 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
