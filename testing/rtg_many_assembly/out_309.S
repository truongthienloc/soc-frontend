.text

#The program checks the ALU instruction in I_type

Main:
		addi    x2 , x0 , 183 
		addi    x22 , x0 , 27 
		addi    x20 , x0 , 152 
		bltu    x2 , x22 , Less_i 
		bgeu    x2 , x22 , Bigger_i 
Less_i:
		addi    x19 , x20 , 167 
		andi    x28 , x20 , 135 
		add     x28 , x28 , x19 
		srli    x28 , x28 , 0 
		addi    x11 , x0 , 447 
		bne     x28 , x11 , Fail 
Bigger_i:
		ori     x19 , x20 , 159 
		xori    x28 , x20 , 184 
		add     x28 , x28 , x19 
		srai    x28 , x28 , 0 
		addi    x11 , x0 , 191 
		bne     x28 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
