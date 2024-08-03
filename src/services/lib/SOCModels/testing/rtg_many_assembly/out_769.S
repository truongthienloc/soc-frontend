.text

#The program checks the ALU instruction in R_type

Main:
		addi    x10 , x0 , 20 
		addi    x24 , x0 , -79 
		addi    x17 , x0 , 73 
		addi    x19 , x0 , 67 
		addi    x15 , x0 , 0 
		blt     x10 , x24 , Less_r 
		bge     x10 , x24 , Bigger_r 
Less_r:
		sub     x6 , x17 , x19 
		and     x21 , x17 , x19 
		add     x21 , x21 , x6 
		srl     x21 , x21 , x15 
		addi    x3 , x0 , 71 
		bne     x21 , x3 , Fail 
Bigger_r:
		or      x6 , x17 , x19 
		xor     x21 , x17 , x19 
		add     x21 , x21 , x6 
		sra     x21 , x21 , x15 
		addi    x3 , x0 , 85 
		bne     x21 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
