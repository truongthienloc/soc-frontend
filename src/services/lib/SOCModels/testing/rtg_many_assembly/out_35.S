.text

#The program checks the ALU instruction in I_type

Main:
		addi    x4 , x0 , 16 
		addi    x25 , x0 , 146 
		addi    x19 , x0 , 108 
		bltu    x4 , x25 , Less_i 
		bgeu    x4 , x25 , Bigger_i 
Less_i:
		addi    x29 , x19 , 145 
		andi    x21 , x19 , 93 
		add     x21 , x21 , x29 
		srli    x21 , x21 , 3 
		addi    x27 , x0 , 41 
		bne     x21 , x27 , Fail 
Bigger_i:
		ori     x29 , x19 , 90 
		xori    x21 , x19 , 116 
		add     x21 , x21 , x29 
		srai    x21 , x21 , 3 
		addi    x27 , x0 , 18 
		bne     x21 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
