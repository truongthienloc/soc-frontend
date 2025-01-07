.text

#The program checks the ALU instruction in I_type

Main:
		addi    x2 , x0 , 39 
		addi    x31 , x0 , 199 
		addi    x22 , x0 , 78 
		bltu    x2 , x31 , Less_i 
		bgeu    x2 , x31 , Bigger_i 
Less_i:
		addi    x29 , x22 , 27 
		andi    x28 , x22 , 64 
		add     x28 , x28 , x29 
		srli    x28 , x28 , 1 
		addi    x11 , x0 , 84 
		bne     x28 , x11 , Fail 
Bigger_i:
		ori     x29 , x22 , 20 
		xori    x28 , x22 , 190 
		add     x28 , x28 , x29 
		srai    x28 , x28 , 2 
		addi    x11 , x0 , 83 
		bne     x28 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
