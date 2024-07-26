.text

#The program checks the ALU instruction in R_type

Main:
		addi    x13 , x0 , 149 
		addi    x31 , x0 , 50 
		addi    x9 , x0 , 119 
		addi    x24 , x0 , 190 
		addi    x21 , x0 , 3 
		blt     x13 , x31 , Less_r 
		bge     x13 , x31 , Bigger_r 
Less_r:
		sub     x19 , x9 , x24 
		and     x26 , x9 , x24 
		add     x26 , x26 , x19 
		srl     x26 , x26 , x21 
		addi    x17 , x0 , -3 
		bne     x26 , x17 , Fail 
Bigger_r:
		or      x19 , x9 , x24 
		xor     x26 , x9 , x24 
		add     x26 , x26 , x19 
		sra     x26 , x26 , x21 
		addi    x17 , x0 , 57 
		bne     x26 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
