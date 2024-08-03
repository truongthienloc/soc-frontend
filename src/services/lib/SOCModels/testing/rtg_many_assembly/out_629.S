.text

#The program checks the ALU instruction in R_type

Main:
		addi    x10 , x0 , 42 
		addi    x11 , x0 , -57 
		addi    x8 , x0 , 179 
		addi    x7 , x0 , 122 
		addi    x3 , x0 , 2 
		blt     x10 , x11 , Less_r 
		bge     x10 , x11 , Bigger_r 
Less_r:
		sub     x9 , x8 , x7 
		and     x21 , x8 , x7 
		add     x21 , x21 , x9 
		srl     x21 , x21 , x3 
		addi    x25 , x0 , 26 
		bne     x21 , x25 , Fail 
Bigger_r:
		or      x9 , x8 , x7 
		xor     x21 , x8 , x7 
		add     x21 , x21 , x9 
		sra     x21 , x21 , x3 
		addi    x25 , x0 , 113 
		bne     x21 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
