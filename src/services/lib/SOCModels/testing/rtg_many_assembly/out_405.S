.text

#The program checks the ALU instruction in R_type

Main:
		addi    x1 , x0 , 107 
		addi    x21 , x0 , 8 
		addi    x25 , x0 , 33 
		addi    x3 , x0 , 51 
		addi    x15 , x0 , 2 
		blt     x1 , x21 , Less_r 
		bge     x1 , x21 , Bigger_r 
Less_r:
		sub     x5 , x25 , x3 
		and     x19 , x25 , x3 
		add     x19 , x19 , x5 
		srl     x19 , x19 , x15 
		addi    x14 , x0 , 3 
		bne     x19 , x14 , Fail 
Bigger_r:
		or      x5 , x25 , x3 
		xor     x19 , x25 , x3 
		add     x19 , x19 , x5 
		sra     x19 , x19 , x15 
		addi    x14 , x0 , 17 
		bne     x19 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
