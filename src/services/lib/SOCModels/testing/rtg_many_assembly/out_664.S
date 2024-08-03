.text

#The program checks the ALU instruction in I_type

Main:
		addi    x5 , x0 , 116 
		addi    x7 , x0 , 34 
		addi    x19 , x0 , 146 
		bltu    x5 , x7 , Less_i 
		bgeu    x5 , x7 , Bigger_i 
Less_i:
		addi    x20 , x19 , 121 
		andi    x9 , x19 , 44 
		add     x9 , x9 , x20 
		srli    x9 , x9 , 4 
		addi    x8 , x0 , 16 
		bne     x9 , x8 , Fail 
Bigger_i:
		ori     x20 , x19 , 159 
		xori    x9 , x19 , 99 
		add     x9 , x9 , x20 
		srai    x9 , x9 , 3 
		addi    x8 , x0 , 50 
		bne     x9 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
