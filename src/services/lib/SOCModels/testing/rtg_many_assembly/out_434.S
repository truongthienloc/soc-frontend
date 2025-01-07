.text

#The program checks the ALU instruction in R_type

Main:
		addi    x19 , x0 , 26 
		addi    x25 , x0 , -73 
		addi    x30 , x0 , 195 
		addi    x31 , x0 , 156 
		addi    x1 , x0 , 2 
		blt     x19 , x25 , Less_r 
		bge     x19 , x25 , Bigger_r 
Less_r:
		sub     x4 , x30 , x31 
		and     x8 , x30 , x31 
		add     x8 , x8 , x4 
		srl     x8 , x8 , x1 
		addi    x13 , x0 , 41 
		bne     x8 , x13 , Fail 
Bigger_r:
		or      x4 , x30 , x31 
		xor     x8 , x30 , x31 
		add     x8 , x8 , x4 
		sra     x8 , x8 , x1 
		addi    x13 , x0 , 79 
		bne     x8 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
