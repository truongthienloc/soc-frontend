.text

#The program finds the value of fibonacci 

Fibo:
		addi    x25 , x0 , 17 
		addi    x31 , x0 , 1 
		addi    x29 , x0 , 1 
		addi    x27 , x0 , 3 
		beq     x25 , x0 , Result0 
		beq     x25 , x29 , Result1 
Loop: 
		blt     x25 , x27 , Result 
		add     x20 , x31 , x29 
		addi    x31 , x29 , 0 
		addi    x29 , x20 , 0 
		addi    x27 , x27 , 1 
		jal     x0 , Loop 
Result0:
		addi    x20 , x0 , 0 
		addi    x4 , x0 , 0 
		bne     x20 , x4 , Fail 
Result1:
		addi    x20 , x0 , 1 
		addi    x26 , x0 , 1 
		bne     x20 , x26 , Fail 
Result:
		addi    x6 , x0 , 1597 
		bne     x20 , x6 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
